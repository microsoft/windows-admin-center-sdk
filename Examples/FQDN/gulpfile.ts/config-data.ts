
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'contosoFQDN',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.fqdn',
            guid: '7ceaf645-907a-4152-846b-b1ff20cd883b',
            list: [
                'src',
                'node_modules/@microsoft/windows-admin-center-sdk'
            ],
            enablePester: false,
            skipCim: true
        }
    };
}

exports.gulpConfig = gulpConfig;
