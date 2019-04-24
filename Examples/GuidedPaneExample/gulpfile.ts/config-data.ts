
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'ContosoGuidedPaneExample',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.guidedpaneexample',
            guid: 'e29382fc-3c57-458b-bf3d-26ad87100be0',
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
