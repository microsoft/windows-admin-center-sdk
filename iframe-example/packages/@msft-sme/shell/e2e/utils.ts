import * as fs from 'fs';
import { By, WebDriver, WebElement, Key } from 'selenium-webdriver';
import './base/polyfills/string';
import './base/utilities';
import { Settings } from './settings';

export class Utils {
    public static logFolder = 'scenariotestresults';
    public static logFile = 'scenariotests.log';
    public static failedTestsFile = 'failedTests.log';
    public static logFilePath = Utils.logFolder + '\\' + Utils.logFile;
    public static failedTestsFilePath = Utils.logFolder + '\\' + Utils.failedTestsFile;
    public static screenshotsFolder = Utils.logFolder + '\\' + 'screenshots';
    public static screenshotsStreamingFolder: string;
    public static Key = Key;

    private static defaultWaitDuration = 1000;
    private static defaultTimeout = 30000;
    private static currentWebDriver: WebDriver;
    private static defaultWindowHandle: string;
    private static stringConcat: (target: string, ...items: string[]) =>
        string = Utils.uncurryThis(String.prototype.concat);
    private static stringSplit: (target: string, separator: string, limit?: number) =>
        string[] = Utils.uncurryThis(String.prototype.split);
    private static hexCharsLowerCase = Utils.stringSplit('0123456789abcdef', '');
    public static logIndent = 0;
    public static useSlowMotion = false;

    public static async initializeAsync(driver: WebDriver, useSlowMotion: boolean) {
        Utils.currentWebDriver = driver;
        Utils.defaultWindowHandle = await driver.getWindowHandle();
        Utils.useSlowMotion = useSlowMotion;
    }

    public static async findElementAsync(
        cssSelector: string,
        text?: string,
        parentWebElement?: WebElement,
        customSelectorHandler?: (webElement: WebElement) => Promise<boolean>
    ): Promise<WebElement> {

        if (!Settings.noColor) {
            await Utils.executeScript(
                "if(!document.getElementById('headStyle')) {var headStyle=document.createElement('style');"
                + "headStyle.id='headStyle';headStyle.innerText='.test-focus{transition:background-color 0.3s;"
                + 'background:rgb(255,255,176) !important}.click-focus{transition:background-color 0.3s;background:rgb(106,255,106)'
                + " !important}';document.getElementsByTagName('head')[0].appendChild(headStyle);}");
        }
        let webElements = await Utils.findElementsAsync(cssSelector, text, parentWebElement, customSelectorHandler);
        if (!Settings.noColor && webElements[0]) {
            await Utils.executeScript(
                "var items=document.querySelectorAll('.test-focus'); for(var i=0;i<items.length;i++)"
                + "{items[i].className=items[i].className.replace('test-focus','').replace('click-focus','')};"
                + "var element=arguments[0]; element.className+=' test-focus';",
                webElements[0]);
        }
        return webElements[0];
    }

    public static async findElementsAsync(
        cssSelector: string,
        text?: string,
        parentWebElement?: WebElement,
        customSelectorHandler?: (webElement: WebElement) => Promise<boolean>
    ): Promise<WebElement[]> {
        let finalWebElements: WebElement[] = [];

        await Utils.retryAsync(
            async (): Promise<void> => {
                let webElementsFromCSSSelector: WebElement[] = [];
                if (parentWebElement) {
                    webElementsFromCSSSelector = await parentWebElement.findElements(By.css(cssSelector));
                } else {
                    webElementsFromCSSSelector = await Utils.currentWebDriver.findElements(By.css(cssSelector));
                }

                let webElementsFromTextFilter: WebElement[] = [];

                if (text) {
                    for (let i = 0; i < webElementsFromCSSSelector.length; i++) {
                        let currentText = await Utils.getTextAsync(webElementsFromCSSSelector[i]);
                        if (currentText === text) {
                            webElementsFromTextFilter.push(webElementsFromCSSSelector[i]);
                        }
                    }
                } else {
                    webElementsFromTextFilter = webElementsFromCSSSelector;
                }

                if (customSelectorHandler) {
                    for (let i = 0; i < webElementsFromTextFilter.length; i++) {
                        if (await customSelectorHandler(webElementsFromTextFilter[i])) {
                            finalWebElements.push(webElementsFromTextFilter[i]);
                        }
                    }
                } else {
                    finalWebElements = webElementsFromTextFilter;
                }
            },
            'findElementsAsync. CSSSelector:' + cssSelector + ' | Text:' + text + ' | Has custom filter: '
            + (customSelectorHandler ? 'Yes' : 'No'));

        return finalWebElements;
    }

    public static async findDirectChildrenAsync(webElement: WebElement): Promise<WebElement[]> {
        return await webElement.findElements(By.xpath('./*'));
    }

    public static async findParentElementAsync(webElement: WebElement, withCSSClasses = '', withTagName?: string): Promise<WebElement> {
        let cssClassesToCheck = withCSSClasses.split(' ');

        let parentNode = webElement;
        let matchCSSClasses = true;
        let matchTagName = true;

        do {
            parentNode = await parentNode.findElement(By.xpath('./..'));
            let tagName = await parentNode.getTagName();

            if (!parentNode || tagName === 'body') {
                break;
            }

            matchCSSClasses = true;
            if (withCSSClasses) {
                let cssClasses = (await Utils.getAttributeAsync(parentNode, 'className')).split(' ');
                if (cssClasses.length >= cssClassesToCheck.length) {
                    for (let i = 0; i < cssClassesToCheck.length; i++) {
                        if (cssClasses.indexOf(cssClassesToCheck[i]) === -1) {
                            matchCSSClasses = false;
                            break;
                        }
                    }
                } else {
                    matchCSSClasses = false;
                }
            }

            matchTagName = true;
            if (withTagName) {
                if (tagName !== withTagName) {
                    matchTagName = false;
                }
            }
        } while (parentNode && !(matchCSSClasses && matchTagName));

        return await parentNode;
    }

    public static async executeScript(script: string, webElement?: WebElement): Promise<void> {
        try {
            await Utils.currentWebDriver.executeScript(script, webElement);
        } catch (e) {
            await Utils.log(e);
        }
    }

    public static async switchToTopFrameAsync(): Promise<void> {
        await Utils.currentWebDriver.switchTo().window(Utils.defaultWindowHandle);
    }

    public static async switchToFrameAsync(frame: WebElement): Promise<void> {
        await Utils.currentWebDriver.switchTo().frame(frame);
    }

    public static async waitAsync(
        conditionHandler: () => Promise<boolean>,
        description: string,
        expectWaitToTimeout?: boolean,
        expectConditionToFail?: boolean): Promise<void> {

        let waitCount = 1;
        let initialTime = Date.now();

        while (true) {
            Utils.log('Wait. Description: ' + description + ' | Round: ' + waitCount);
            try {
                let result = await conditionHandler();
                if (result) {
                    break;
                }
            } catch (e) {
                if (!expectConditionToFail) {
                    throw e;
                }
                Utils.log('Error during waiting:' + e);
            }

            let now = Date.now();
            if (now - initialTime > Utils.defaultTimeout) {
                if (!expectWaitToTimeout) {
                    let error = 'Wait timeout. Description: ' + description;
                    fail(error);
                    throw error;
                } else {
                    break;
                }
            }

            await Utils.sleepAsync(Utils.defaultWaitDuration);
            waitCount++;
        }
    }

    public static async retryAsync(
        retryHandler: () => Promise<void>, description?: string, shouldRetry?: () => boolean, expectRetryFailure?: boolean,
        onFail?: (error: any) => void, retryCount = 2): Promise<void> {
        try {
            await retryHandler();

            if (shouldRetry && shouldRetry()) {
                let error = 'Action failed eventually by custom rule. Description: ' + description;
                if (!expectRetryFailure) {
                    throw error;
                }
            }
        } catch (e) {
            Utils.log('Action Failed. Description: ' + description + '. Retry attempts left: ' + retryCount);
            if (retryCount > 0) {
                await Utils.sleepAsync(Utils.defaultWaitDuration);
                await Utils.retryAsync(retryHandler, description, shouldRetry, expectRetryFailure, onFail, retryCount - 1);
            } else {
                let error = 'Action failed eventually by throwing exception. Description: ' + description + ' | Exception: ' + e;
                Utils.log(error);
                if (!expectRetryFailure) {
                    if (onFail) {
                        onFail(e);
                    }
                    throw error;
                }
            }
        }
    }

    public static async waitForVisibleAsync(webElement: WebElement): Promise<void> {
        await Utils.waitAsync(
            async (): Promise<boolean> => {
                return await Utils.isVisibleAsync(webElement);
            },
            'waitForVisibleAsync');
    }

    public static async waitForNotVisibleAsync(webElement: WebElement): Promise<void> {
        await Utils.waitAsync(
            async (): Promise<boolean> => {
                return !(await Utils.isVisibleAsync(webElement));
            },
            'waitForNotVisibleAsync');
    }

    public static async isVisibleAsync(webElement: WebElement): Promise<boolean> {
        try {
            if (webElement) {
                let isElementPresent = await webElement.isDisplayed();
                if (isElementPresent) {
                    return true;
                }
            }
        } catch (e) {
            Utils.log('Exception when trying to check whether web element is visible: ' + e);
            return false;
        }

        return false;
    }

    public static async isDisabledAsync(webElement: WebElement): Promise<boolean> {
        try {
            if (webElement) {
                let isElementPresent = await webElement.isDisplayed();
                if (isElementPresent) {
                    let disabledAttribute = await Utils.getAttributeAsync(webElement, 'disabled');
                    if (disabledAttribute) {
                        return true;
                    }
                }
            }
        } catch (e) {
            Utils.log('Exception when trying to check whether web element is disabled: ' + e);
            return false;
        }

        return false;
    }

    public static async getTextAsync(webElement: WebElement, skipTrim?: boolean): Promise<string> {
        let text: string = null;
        text = await webElement.getText();
        if (!skipTrim) {
            text = text.trim();
        }
        return text;
    }

    public static async sleepAsync(milliseconds: number): Promise<void> {
        await Utils.currentWebDriver.sleep(milliseconds);
    }

    public static async sendKeyToActiveElement(keys:string): Promise<void>{
        await Utils.sendKeysAsync(null, keys, true);
    }

    public static async getActiveElement():Promise<WebElement>{
        return await Utils.currentWebDriver.switchTo().activeElement();
    }

    public static async sendKeysAsync(webElement: WebElement, keys: string, skipClicking?: boolean): Promise<void> {
        if (!webElement) {
            webElement = await Utils.getActiveElement();
        }
        if (!skipClicking) {
            await webElement.click();
        }
        await webElement.sendKeys(keys);
        await Utils.checkSlowMotion();
        Utils.takeScreenshot();
    }

    public static async clickAsync(webElement: WebElement, skipScrollIntoView?: boolean): Promise<void> {
        try {
            if (!Settings.noColor) {
                await Utils.executeScript('arguments[0].className+=" click-focus"', webElement);
            }
            await Utils.checkSlowMotion();
            if (!skipScrollIntoView) {
                await Utils.executeScript('arguments[0].scrollIntoView()', webElement);
            }
            await webElement.click();
            Utils.log('Clicking is successful.');
        } catch (e) {
            Utils.log('Error in clickAsync. Try the backup solution of directly calling the DOM click method. Exception:' + e);
            await Utils.currentWebDriver.executeScript('arguments[0].click()', webElement);
            Utils.log('The backup solution works.');
        }
        Utils.takeScreenshot();
    }

    public static async clickByTextAsync(parentWebElement: WebElement, text: string): Promise<void> {
        await Utils.retryAsync(
            async () => {
                let webElement = await Utils.findElementAsync('*', text, parentWebElement);
                await Utils.clickAsync(webElement);
            },
            'Try to click the element with text: ' + text);
    }

    public static async getAttributeAsync(webElement: WebElement, attributeName: string): Promise<string> {
        return await webElement.getAttribute(attributeName);
    }

    public static log(content: string): void {
        if (content) {
            let date = new Date();
            let logIndent = '';
            for (let i = 0; i < Utils.logIndent; i++) {
                logIndent += '|';
            }
            content = date.toISOString() + '   ' + logIndent + content;
        } else {
            // The following code is used to break the row since sometimes
            // other console logs from Jasmine would mess up the console.log by writing a console log without "\n"
            content = ' ';
        }

        console.log(content);

        Utils.writeLogToFile(content, Utils.logFilePath);
    }

    public static logActionStart(objectName: string, actionName: string, parameter?: any): void {
        Utils.log('Action Start: ' + objectName + ' -> ' + actionName + (parameter ? (' Parameter: ' + parameter) : ''));
        Utils.logIndent++;
    }

    public static logActionEnd(objectName: string, actionName: string, result?: any): void {
        Utils.logIndent--;
        Utils.log('Action End:   ' + objectName + ' -> ' + actionName + (result ? (' Result: ' + result) : ''));
        if (Utils.logIndent === 0) {
            Utils.log('-------------------------------------------');
        }
    }

    public static async checkSlowMotion() {
        if (Utils.useSlowMotion) {
            await Utils.sleepAsync(Settings.slowMotionWaitingDuration);
        }
    }

    public static async takeScreenshot() {
        let date = new Date();
        let timestamp = date.toISOString().replace(/:/g, '-');
        let data = await Utils.currentWebDriver.takeScreenshot();

        if (!fs.existsSync(Utils.screenshotsFolder)) {
            fs.mkdirSync(Utils.screenshotsFolder);
        }

        fs.writeFile(Utils.screenshotsFolder + '\\record' + timestamp + '.png', data, 'base64', null);

        if (Utils.screenshotsStreamingFolder) {
            fs.writeFile(Utils.screenshotsStreamingFolder + '\\record' + timestamp + '.png', data, 'base64', null);
        }
    }

    public static deleteDirectory(path: string) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                let currPath = path + '/' + file;
                if (fs.lstatSync(currPath).isDirectory()) {
                    Utils.deleteDirectory(currPath);
                } else {
                    fs.unlinkSync(currPath);
                }
            });

            fs.rmdirSync(path);
        }
    }

    public static async writeFailedTestToFile(failedTest: string) {
        this.writeLogToFile(failedTest, Utils.failedTestsFilePath);
    }

    public static newGuid(): string {
        const applyCall: (f: (...args: any[]) => any, target: any, args: any[] | IArguments) => any = Utils.uncurryThis(Function.apply);

        // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
        const guid = Utils.getRandomHexString(36);
        guid[8] = guid[13] = guid[18] = guid[23] = '-'; // fill in the dash.
        guid[14] = '4'; // set the 4 in the guid.
        // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
        // guid[19] = hexValues[8 + (Math.random() * 4) | 0]; /*clockSequenceHi*/
        // Since guid[19] is already random. reused the numbe by get its index rather than another Math.random call.
        // tslint:disable-next-line:no-bitwise
        guid[19] = Utils.hexCharsLowerCase[8 + (Utils.hexCharsLowerCase.indexOf(guid[19]) & 0x3)];

        return applyCall(Utils.stringConcat, '', guid);
    }

    public static async navigateToUrl(url: string): Promise<void> {
        await Utils.currentWebDriver.get(url);
    }

    private static writeLogToFile(logContent: string, filePath: string) {
        if (!fs.existsSync(Utils.logFolder)) {
            fs.mkdirSync(Utils.logFolder);
        }

        fs.appendFile(filePath, logContent + '\r\n', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    private static uncurryThis(f: (...args: any[]) => any): (...args: any[]) => any {
        return function () {
            return Function.call.apply(f, arguments);
        };
    }

    private static getRandomHexString(len: number): string[] {
        let tmp: number;
        let ret: string[] = new Array(len);

        // This implementation optimization of speed mimimize the cost of Math.random.
        // equal chance for all number
        while (len) {
            // tslint:disable-next-line:no-bitwise
            tmp = 4294967296 * Math.random() | 0;  // get the max integer our of 32 digit.
            let times = 8; // for every random number we can harvest 8 times.
            while (times--) {
                // tslint:disable-next-line:no-bitwise
                ret[--len] = Utils.hexCharsLowerCase[tmp & 0xF]; // fill from the back.
                if (len < 0) {
                    return ret; // we filled all the bucket, return now.
                }
                // tslint:disable-next-line:no-bitwise
                tmp >>>= 4; // zero fill right shift to ensure return is always positive number.
            }
        }
    }
}
