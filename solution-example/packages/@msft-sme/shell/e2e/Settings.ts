const argv = require('yargs').argv;

export class Settings {
    private static screenshotValue: string;

    public static get sideLoad(): string {
        return Settings.getSettings('sideLoad', '');
    }

    public static get protocol(): string {
        return Settings.getSettings('protocol', 'http');
    }

    public static get host(): string {
        return Settings.getSettings('host', 'localhost');
    }

    public static get port(): string {
        return Settings.getSettings('port', '4100');
    }

    public static get connection(): string {
        return Settings.getSettings('connection', 'sme-full1.redmond.corp.microsoft.com');
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

    private static getSettings(name: string, defaultValue: string): string {
        let result = defaultValue;

        if (argv[name]) {
            result = argv[name];
        } else if (process.env.e2e && process.env.e2e[name]) {
            result = process.env.e2e[name];
        }
        return result;
    }
}