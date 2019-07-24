
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'MicrosoftCredDialog',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'microsoft.creddialog',
            guid: '8f66d338-67ba-4752-b63a-0cb475e2924b',
            list: [
                'src',
                'node_modules/@microsoft/windows-admin-center-sdk'
            ],
            enablePester: false,
            skipCim: true
        },
        test: {
            skip: true
        }
    };
}

exports.gulpConfig = gulpConfig;
