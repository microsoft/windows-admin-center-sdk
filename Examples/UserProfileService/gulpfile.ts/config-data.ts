
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'ContosoUserProfileService',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.userprofileservice',
            guid: '2138e1a4-745a-4ba6-b774-88df37b1a347',
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
