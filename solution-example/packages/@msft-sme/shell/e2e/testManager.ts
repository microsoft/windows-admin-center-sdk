const http = require('http');
import { Builder, Capabilities, Options, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Settings } from './settings';
import { TestSuite } from './testSuite';
import { BaseUI } from './ui/baseUI';
import { Shell } from './ui/shell';
import { Utils } from './utils';

export class TestManager<T extends BaseUI> {
    public static currentInstance: TestManager<any> = null;

    private testHost = Settings.host;
    private testPort = Settings.port;
    private timer = null;
    public webDriver: WebDriver;
    public shell: Shell = new Shell('Shell');
    public addConnection: BaseUI = new BaseUI('Add Connection Iframe');
    public tool: T;
    public useSlowMotion = false;

    public testSuite: TestSuite = new TestSuite();

    constructor(tool: T) {
        this.tool = tool;
        this.useSlowMotion = Settings.useSlowMotion;
        this.testSuite.testManager = this;
        TestManager.currentInstance = this;
    }

    public async startTestCaseAsync(): Promise<void> {
        let builder = new Builder();

        if (Settings.browser === 'chrome' && Settings.customChromeBinaryPath) {
            let chromeOptions = new ChromeOptions();
            Utils.log('setChromeBinaryPath: ' + Settings.customChromeBinaryPath.replace('~', process.cwd()));
            chromeOptions.setChromeBinaryPath(Settings.customChromeBinaryPath.replace('~', process.cwd()));
            builder.setChromeOptions(chromeOptions);
        }
        this.webDriver = builder.forBrowser(Settings.browser).build();
        await Utils.initializeAsync(this.webDriver, this.useSlowMotion);

        await this.webDriver.get(this.getBaseAddress());

        if (Settings.screenshot) {
            this.timer = setInterval(
                () => {
                    Utils.takeScreenshot();
                },
                1000);
        }
    }

    public async finishTestCaseAsync(): Promise<void> {
        if (this.useSlowMotion) {
            await Utils.sleepAsync(5000);
        }

        if (Settings.screenshot) {
            Utils.takeScreenshot();
        }

        clearInterval(this.timer);
        await this.webDriver.close();
    }

    public async goToConnectionAndToolAsync(connectionName: string, toolName: string, toolFrameSrcKeyword?: string): Promise<void> {
        if (!connectionName) {
            connectionName = Settings.connection;
        }

        Utils.logActionStart(
            'Test Manager',
            'goToConnectionAndToolAsync',
            'Connection Name:' + connectionName + ' | Tool Name:' + toolName + ' | Tool Frame Src Keyword:' + toolFrameSrcKeyword);
        await this.shell.waitForReadyAsync();
        await this.shell.goToConnectionAsync(connectionName);
        await this.shell.goToToolAsync(toolName);
        await this.shell.toolListToggle.clickAsync();
        await this.shell.switchToToolIFrameAsync(toolFrameSrcKeyword);
        await this.tool.waitForReadyAsync();
        Utils.logActionEnd('Test Manager', 'goToConnectionAndToolAsync');
    }

    public async startProcessAsync(connection: string, processName: string): Promise<void> {
        Utils.logActionStart('Test Manager', 'Request Start', connection + ' | ' + processName);

        return new Promise<void>((resolve, reject) => {
            let postData = JSON.stringify({
                parameters: {
                    commandLine: processName
                }
            });

            let postOptions = {
                host: this.testHost,
                port: this.testPort,
                path: '/api/nodes/' + connection
                + '/features/cim/namespaces/root.Microsoft.Windows.ManagementTools2/classes/MSFT_MTProcess/methods/CreateProcess/invoke',
                method: 'POST'
            };

            let postReq = http.request(postOptions, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    Utils.logActionEnd('Test Manager', 'Request Finish');
                    resolve();
                });
            });

            postReq.write(postData);
            postReq.end();
        });
    }

    private getBaseAddress() {
        let baseAddress = Settings.protocol + '://' + this.testHost + ':' + this.testPort + '/?disableDayZero=true';
        if (Settings.sideLoad) {
            baseAddress += '&sideload=' + Settings.sideLoad;
        }
        return baseAddress;
    }
}

// The following function is defined to be only use in debug console.
// By using this function, we can play with any async function and see the result in debug console during debugging.
global['evalAsync'] = (promiseResult: Promise<any>, resultProcessingHandler: (result: any) => any): string => {
    promiseResult.then(
        result => {
            console.log('----------DEBUG CONSOLE ASYNC FUNCTION EVALUATION RESULT----------');
            if (resultProcessingHandler) {
                result = resultProcessingHandler(result);
            }
            console.log(result);
            console.log('------------------------------------------------------------------');
            // tslint:disable-next-line:no-debugger
            debugger;
        },
        error => {
            console.log('----------DEBUG CONSOLE ASYNC FUNCTION EVALUATION ERROR----------');
            console.log(error);
            console.log('------------------------------------------------------------------');
            // tslint:disable-next-line:no-debugger
            debugger;
        });
    return '***Please continue the debugger to let the async function call move on.***\r\n'
        + 'When the result is ready, a breakpoint will be hit and you will see it in debug console.';
};