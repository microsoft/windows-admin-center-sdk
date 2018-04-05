import { ConnectionType } from './testManager';
const argv = require('yargs').argv;

export class Settings {
    private static screenshotValue: string;
    
    public static get sideLoad(): string {
        return Settings.getSettings('sideLoad', '');
    }

    public static get gatewayUrl(): string {
        return Settings.getSettings('gatewayUrl', 'http://localhost:4100');
    }

    public static get protocol(): string {
        return Settings.getSettings('protocol', 'http');
    }

    public static get host(): string {
        if (!global['hostValue']) {
            global['hostValue'] = Settings.getSettings('host', 'localhost');
        }

        return global['hostValue'];
    }

    public static set host(value: string) {
        global['hostValue'] = value;
    }  

    public static get port(): string {
        return Settings.getSettings('port', '4100');
    }

    public static get connection(): string {
        if (!global['connectionValue']) {
            global['connectionValue'] = Settings.getSettings('connection', 'sme-full1.redmond.corp.microsoft.com');
        }

        return global['connectionValue'];
    }

    public static set connection(value: string) {
        global['connectionValue'] = value;
    }

    public static get connectionType(): ConnectionType {
        if (global['connectionTypeValue'] === undefined || global['connectionTypeValue'] === null) {
            global['connectionTypeValue'] = Settings.getSettings('connectionType', null);
        }

        return global['connectionTypeValue'];
    }

    public static set connectionType(value: ConnectionType) {
        global['connectionTypeValue'] = value;
    }

    public static get testResourceConfig(): string {
        return Settings.getSettings('testResourceConfig', '');
    }

    public static get labRun(): boolean {
        return !!Settings.getSettings('labRun', '');
    }

    public static get collectConsoleLogs(): boolean {
        return !!Settings.getSettings('collectConsoleLogs', true);
    }

    public static get consoleLogLevel(): string {
        return Settings.getSettings('consoleLogLevel', '7');
    }

    public static get collectNetworkTraffic(): boolean {        
        return !!Settings.getSettings('collectNetworkTraffic', false);
    }

    public static get browser(): string {
        return Settings.getSettings('browser', 'chrome');
    }

    public static get useSlowMotion(): boolean {
        return !!Settings.getSettings('useSlowMotion', null);
    }

    public static get slowMotionWaitingDuration(): number {
        return parseInt(Settings.getSettings('slowMotionWaitingDuration', '2000'), 10);
    }

    public static get customChromeBinaryPath(): string {
        return Settings.getSettings('customChromeBinaryPath', '');
    }

    public static get screenshot(): string {
        if (!Settings.screenshotValue) {
            Settings.screenshotValue = Settings.getSettings('screenshot', '');
        }

        return Settings.screenshotValue;
    }

    public static set screenshot(value: string) {
        Settings.screenshotValue = value;
    }

    public static get noColor(): string {
        return Settings.getSettings('noColor', '');
    }

    public static get onlyRun(): string {
        return Settings.getSettings('onlyRun', '');
    }

    private static getSettings(name: string, defaultValue) {
        let result = defaultValue;

        if (argv[name]) {
            result = argv[name];
        } else if (process.env.e2e && process.env.e2e[name]) {
            result = process.env.e2e[name];
        }
        return result;
    }
}