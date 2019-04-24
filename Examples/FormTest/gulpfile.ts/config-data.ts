
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'ContosoFormTest',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.formtest',
            guid: '6629d4d5-9c18-4be3-8916-80872622bb0b',
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
