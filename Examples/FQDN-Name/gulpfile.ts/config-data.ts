
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'ContosoFQDNName',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.fqdn-name',
            guid: '86fb8c6c-e0bc-41d2-b748-a14539e72e34',
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
