
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'contosoPromptForCreds',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.promptforcreds',
            guid: '98b72128-02e5-40fe-8409-088497e08717',
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
