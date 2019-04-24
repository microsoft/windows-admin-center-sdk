
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'ContosoInstallfilesonnode',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.install-files-on-node',
            guid: '10864d09-3ed5-4822-92b9-f5c3b17ff1d4',
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
