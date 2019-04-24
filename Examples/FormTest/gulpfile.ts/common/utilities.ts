const values = require('yargs').argv;
const childProcess = require('child_process');
const log = require('fancy-log');

module Utilities {

    function toBoolean(value: any, defaultValue: boolean = false) {
        return defaultValue ? value !== false : !!value;
    }

    export function gulpArgv(): { [index: string]: boolean } {
        return {
            prod: toBoolean(values['prod']),
            verbose: toBoolean(values['verbose']),
            junit: toBoolean(values['junit']),
            expandCss: toBoolean(values['expandcss']),
            target: values['target'],
            debug: values['debug'],
            styles: toBoolean(values['styles']),
            resources: toBoolean(values['resources']),
            core: toBoolean(values['core']),
            angular: toBoolean(values['angular']),
            app: toBoolean(values['app']),
            devGuide: toBoolean(values['devguide'])
        };
    }

    export function exportFunctions(context: any, gulpModule: any): void {
        for (const func in gulpModule) {
            if (gulpModule.hasOwnProperty(func)) {
                context[func] = gulpModule[func];
            }
        }
    }

    export function ng(cb, args, options = {}, codeHandler = null) {
        log('ng', args.join(' '));
        const errors = [];
        const cmd = childProcess.spawn('ng.cmd', args, options);
        cmd.stdout.on('data', function (data) { log(data.toString().trim()); });
        cmd.stderr.on('data', function (data) {
            const message = data.toString().trim();
            if (message.toUpperCase().startsWith('ERROR')) {
                log.error(message);
                errors.push(message);
            } else {
                log(message);
            }
        });
        cmd.on('exit', function (code) {
            if (codeHandler) {
                const codeError = codeHandler(code);
                if (codeError) {
                    errors.push(codeError);
                }
            }
            if (errors.length > 0) {
                cb(errors.join('\n'));
            } else { cb(); }
        });

    }
}

Utilities.exportFunctions(exports, Utilities);
