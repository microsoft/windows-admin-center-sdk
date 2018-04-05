const http = require('http');
import * as fs from 'fs';
import { Builder, Capabilities, logging, Options, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { DataTable } from '.';
import { Settings } from './Settings';
import { TestSuite } from './testSuite';
import { BaseUI } from './ui/baseUI';
import { Shell } from './ui/shell';
import { Utils } from './utils';

export class TestManager<T extends BaseUI> {
    public static currentInstance: TestManager<any> = null;

    private screenshotTimer = null;
    private logTimer = null;
    public webDriver: WebDriver;
    public shell: Shell = new Shell('Shell');
    public addConnection: BaseUI = new BaseUI('Add Connection Iframe');
    public tool: T;
    public useSlowMotion = false;
    public testDataNamePrefix = 'TD-';
    public testShell = false;

    public connectionCandidates: string[];
    public hostCandidates: string[];
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

        let logPreferences = new logging.Preferences();
        logPreferences.setLevel(logging.Type.BROWSER, logging.Level.ALL);
        // TODO: When we need to collect network traffic, one of the following log collection mechanisms need to be enabled
        // logPreferences.setLevel(logging.Type.DRIVER, logging.Level.ALL);
        // logPreferences.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL);
        builder.setLoggingPrefs(logPreferences);

        if (Settings.testResourceConfig) {
            this.hostCandidates = null;
            await Utils.retryAsync(
                async () => {
                    Utils.logIndent = 0;
                    if (!this.testShell) {
                        await this.resolveTestHostAsync();
                    }
                    this.webDriver = builder.forBrowser(Settings.browser).build();
                    await Utils.initializeAsync(this.webDriver, this.useSlowMotion);
                    this.webDriver.get(this.getTestURL());
                    await Utils.waitAsync(
                        async () => {
                            await Utils.sleepAsync(10000);
                            if (!(await this.shell.applicationLogo.isVisibleAsync())) {
                                await this.webDriver.get(this.getTestURL());
                                return false;
                            }
                            return true;
                        },
                        'Wait for loading the homepage', false, true);

                    try {
                        await this.shell.getChildUIObject({ name: 'Application Logo', selector: 'sme-app-bar' }).waitForVisibleAsync();
                    } catch (e) {
                        this.webDriver.close();
                        throw e;
                    }
                },
                'Tries to find a live host');
        } else {
            this.webDriver = builder.forBrowser(Settings.browser).build();
            await Utils.initializeAsync(this.webDriver, this.useSlowMotion);
            await this.webDriver.get(this.getTestURL());
        }

        // In lab, we want to provide auto screenshot streaming feature.
        // We will automatically generate the config with the filename "E2EStreaming.txt"
        // If Test Manager finds this fine, it would set up the streaming.
        await (async () => {
            let promise = new Promise<void>((resolve, reject) => {
                fs.readFile('E2EStreaming.txt', 'utf8', (error, data) => {
                    if (!error) {
                        Utils.log('Found auto streaming config: ' + data);
                        let folder = '\\\\sme-gateway3\\E2EDataStreaming\\' + data;
                        folder = folder.replace(/\n/g, '').replace(/\r/g, '');
                        this.doScreenshotStreaming(folder);
                        resolve();
                    } else {
                        Utils.log('No auto streaming config found.')
                        resolve();
                    }
                });
            });
            return promise;
        })();

        // If collecting logs, then setup short interval to re-log them to our own logs
        if (Settings.collectConsoleLogs || Settings.collectNetworkTraffic) {
            this.logTimer = setInterval(
                () => {
                    let logManager = this.webDriver.manage().logs();

                    // print console logs if collecting them
                    if (Settings.collectConsoleLogs) {
                        logManager.get(logging.Type.BROWSER).then(logs => {
                            logs.forEach(consoleLog => {
                                let date = new Date(consoleLog.timestamp);
                                Utils.log(`Console ${consoleLog.level}: ${date.toISOString()} -> ${consoleLog.message}`);
                            });
                        });
                    }

                    // collect networking logs if we are supposed to collect traffic info 
                    // TODO: IMPLEMENT NETWORK TRAFFIC COLLECTION (requires log collection to be turned on above, plus proper parsing logic)
                    // if (Settings.collectNetworkTraffic) {
                    //     // TODO: Figure out which log to use for network traffic logging.Type.PERFORMANCE or logging.Type.DRIVER
                    //     logManager.get(logging.Type.DRIVER).then(logs => {
                    //         logs.forEach(consoleLog => {
                    //             let date = new Date(consoleLog.timestamp);
                    //             // TODO: parse logs for network traffic information
                    //         });
                    //     });
                    // }
                },
                500);
        }

        if (Settings.screenshot || Utils.screenshotsStreamingFolder) {
            this.screenshotTimer = setInterval(
                () => {
                    Utils.takeScreenshot();
                },
                1000);
        }
    }

    public async resetBrowser(): Promise<void> {
        // await Utils.navigateToUrl(this.getBaseAddress());
        await Utils.navigateToUrl(this.getTestURL());
    }

    public async finishTestCaseAsync(): Promise<void> {
        if (this.useSlowMotion) {
            await Utils.sleepAsync(5000);
        }

        if (Settings.screenshot || Utils.screenshotsStreamingFolder) {
            Utils.takeScreenshot();
        }

        clearInterval(this.screenshotTimer);
        clearInterval(this.logTimer);
        await this.webDriver.close();
    }

    public async goToConnectionAndToolAsync(connectionName: string, toolName: string, toolFrameSrcKeyword?: string,
        connectionType?: ConnectionType, userName?: string, password?: string): Promise<void> {
        if (!connectionName) {
            connectionName = Settings.connection;
        }

        connectionType = connectionType || Settings.connectionType || ConnectionType.Server;

        Utils.logActionStart(
            'Test Manager',
            'goToConnectionAndToolAsync',
            'Connection Name:' + connectionName + ' | Tool Name:' + toolName + ' | Tool Frame Src Keyword:' + toolFrameSrcKeyword);

        this.shell.switchToTopFrameAsync();
        if (await this.shell.applicationLogo.isVisibleAsync()) {
            await this.shell.goToHomeScreenAsync();
        }

        await this.shell.waitForReadyAsync();
        await this.shell.goToConnectionAsync(connectionName, connectionType, userName, password);
        await this.shell.goToToolAsync(toolName);
        await this.shell.toolListToggle.clickAsync();
        await this.shell.switchToToolIFrameAsync(toolFrameSrcKeyword);
        await this.tool.waitForReadyAsync();
        Utils.logActionEnd('Test Manager', 'goToConnectionAndToolAsync');
    }

    public doScreenshotStreaming(shareFolderLocation: string) {
        // This function is purely for troubleshooting test issues by running the test in lab based on your own branch.
        // By using this function, you can see real time testing activities to understand better what's going on in the test running.
        // ***** NOTE: PLEASE DON'T CHECK IN THE FUNCTION CALL OF THIS FUNCTION INTO MASTER BRANCH *****
        Utils.screenshotsStreamingFolder = shareFolderLocation;
    }

    public async readConfigFile(): Promise<any> {
        let json;
        let connection = '';
        if (Settings.testResourceConfig) {
            let fs = require('fs');
            await (async () => {
                let promise = new Promise<void>((resolve, reject) => {
                    fs.readFile(Settings.testResourceConfig, 'utf8', function (error, data) {
                        if (error) {
                            Utils.log('Error reading the test resource config file: ' + error);
                            reject();
                        }

                        json = JSON.parse(data);
                        resolve();
                    });
                });
                return promise;
            })();
        }

        return json;
    }

    public getTestURL() {
        let url = Settings.protocol + '://' + Settings.host + ':' + Settings.port + '/?disableDayZero=true';
        if (Settings.sideLoad) {
            url += '&sideload=' + Settings.sideLoad;
        }
        if (this.testShell && Settings.gatewayUrl) {
            url += '&gatewayUrl=' + Settings.gatewayUrl;
        }
        if (Settings.collectConsoleLogs) {
            url += `&consoleDebug=${Settings.consoleLogLevel}`;
        }

        return url;
    }

    public async getWorkingHost(hosts: string[]): Promise<string> {

        if (this.hostCandidates.length <= 0) {
            return '';
        }

        let candidateIndex = Math.floor(Math.random() * this.hostCandidates.length);
        let candidate = hosts[candidateIndex];
        this.hostCandidates.splice(candidateIndex, 1);
        return candidate;
    }

    public async resolveTestHostAsync(): Promise<void> {
        Utils.log('Tries to resolve the host');
        let json = await this.readConfigFile();

        if (!this.hostCandidates) {
            this.hostCandidates = json['gateways'].list;
        }

        let resolvedHost = await this.getWorkingHost(this.hostCandidates);
        if (!resolvedHost) {
            throw 'Failed to find any available host';
        }

        Settings.host = resolvedHost;
        Utils.log('Host: ' + Settings.host);
    }

    public async resolveTestConnectionAsync(category: string): Promise<void> {
        Utils.log('Tries to resolve the connection for category: ' + category);
        let json = await this.readConfigFile();
        let connection = '';

        if (!this.connectionCandidates) {
            this.connectionCandidates = json[category].list;
        }

        let resolvedConnection = await this.getWorkingMachine(this.connectionCandidates);
        if (!resolvedConnection) {
            throw 'Failed to find any available connection';
        }

        Settings.connection = resolvedConnection;
        Settings.connectionType = this.getConnectionTypeEnum(json[category].type);

        Utils.log('Connection: ' + Settings.connection);
        Utils.log('ConnectionType: ' + Settings.connectionType);

    }

    public getConnectionTypeEnum(connectionType): ConnectionType {

        let value = ConnectionType.Server;
        switch (connectionType) {
            case 'Server':
                value = ConnectionType.Server;
                break;
            case 'WindowsClient':
                value = ConnectionType.WindowsClient;
                break;
            case 'FailoverCluster':
                value = ConnectionType.FailoverCluster;
                break;
            case 'HyperConvergedCluster':
                value = ConnectionType.HyperConvergedCluster;
                break;
        }

        return value;
    }

    public async isAliveAsync(host: string): Promise<boolean> {
        let ping = require('ping');
        let result = await (async (): Promise<boolean> => {
            let promise = new Promise<boolean>((resolve, reject) => {
                if (ping) {
                    ping.sys.probe(host, function (isAlive) {
                        let msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                        Utils.log(msg);
                        resolve(isAlive);
                    });
                } else {
                    Utils.log('Warning: Please add the ping package');
                    resolve(true);
                }
            });
            return promise;
        })();

        return result;
    }

    public async getWorkingMachine(servers: string[]): Promise<string> {

        if (this.connectionCandidates.length <= 0) {
            return '';
        }

        let candidateIndex = Math.floor(Math.random() * this.connectionCandidates.length);
        let candidate = servers[candidateIndex];
        this.connectionCandidates.splice(candidateIndex, 1);
        return candidate;
    }

    public createTestDataName(): string {
        let utcTicks = new Date((new Date()).toISOString()).getTime();
        return this.testDataNamePrefix + utcTicks;
    }

    public async cleanOldTestData(
        navigateToDataTableForRemovingOldTestDataHandler: () => Promise<void>,
        dataTableForTestData: DataTable,
        columnNameForTestDataUniqueName: string,
        deleteTestDataItemHandler: (uniqueName: string) => Promise<void>,
        navigateBackToInitialUIHandler: () => Promise<void>): Promise<void> {

        if (navigateToDataTableForRemovingOldTestDataHandler) {
            await navigateToDataTableForRemovingOldTestDataHandler();
        }

        try {
            await this.tool.waitForReadyAsync();

            let utcNow = new Date((new Date()).toISOString());
            let dataToDelete: string[] = [];
            await Utils.retryAsync(
                async () => {
                    let dataNames = await dataTableForTestData.getCellTextInAllItemsAsync(columnNameForTestDataUniqueName);
                    for (let i = 0; i < dataNames.length; i++) {
                        let dataName = dataNames[i];
                        if (dataName.indexOf(this.testDataNamePrefix) === 0) {
                            let timeStamp = new Date(parseInt(dataName.replace(this.testDataNamePrefix, ''), 10));
                            if ((utcNow.valueOf() - timeStamp.valueOf()) > 1200000) {
                                dataToDelete.push(dataName);
                            }
                        }

                        if (dataName.indexOf('ScenarioTest-') === 0) {
                            dataToDelete.push(dataName);
                        }
                    }
                },
                'Tries to get the test data names', null, true);

            Utils.log('Found data items to delete: ' + dataToDelete.length);
            for (let i = 0; i < dataToDelete.length; i++) {
                Utils.log('Delete test data: ' + (i + 1) + '/' + dataToDelete.length);
                await deleteTestDataItemHandler(dataToDelete[i]);
            }
        } catch (e) {
            Utils.log('Error when cleaning the test data: ' + e);
        }

        if (navigateBackToInitialUIHandler) {
            await navigateBackToInitialUIHandler();
        }
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

export enum ConnectionType {
    Server,
    WindowsClient,
    FailoverCluster,
    HyperConvergedCluster
}