"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PsCodeConverter = /** @class */ (function () {
    function PsCodeConverter(options) {
        this.options = options;
    }
    Object.defineProperty(PsCodeConverter.prototype, "content", {
        get: function () {
            return this.buffer.join('\r\n');
        },
        enumerable: true,
        configurable: true
    });
    PsCodeConverter.prototype.contentReset = function () {
        this.buffer = [];
    };
    PsCodeConverter.prototype.generate = function (groups) {
        var tsBase = null;
        this.buffer.push(PsCodeConverter.openContent);
        this.buffer.push(this.indent(1) + 'const module = ' + '\'' + this.options.powerShellModuleName + '\';');
        this.addData(groups);
        this.buffer.push(PsCodeConverter.closeContent);
    };
    PsCodeConverter.prototype.toJsonName = function (original) {
        var name = this.toCommandName(original);
        return this.replaceAll(name, '-', '_');
    };
    PsCodeConverter.prototype.toCommandName = function (original) {
        var index = original.indexOf('.ps1');
        if (index <= 0) {
            console.error('Script file must use .ps1 extension.');
            return original;
        }
        return original.substr(0, index);
    };
    PsCodeConverter.prototype.toPascalName = function (original) {
        var name = original[0].toUpperCase() + original.substr(1);
        var pascal = '';
        var upper = true;
        for (var i = 0; i < name.length; i++) {
            var char = name.charAt(i);
            if (char === '-') {
                upper = true;
            }
            else if (char === '\\') {
                pascal += '_';
            }
            else {
                pascal += upper ? char.toUpperCase() : char;
                upper = false;
            }
        }
        return pascal;
    };
    PsCodeConverter.prototype.regexEscape = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };
    PsCodeConverter.prototype.replaceAll = function (input, searchValue, replaceValue) {
        return input.replace(new RegExp(this.regexEscape(searchValue), 'g'), replaceValue);
    };
    PsCodeConverter.prototype.addBeginGroup = function (name, indent) {
        this.buffer.push(this.indent(indent) + 'export module ' + name + ' {');
    };
    PsCodeConverter.prototype.addEndGroup = function (name, indent) {
        this.buffer.push(this.indent(indent) + '}');
    };
    PsCodeConverter.prototype.addToContent = function (name, command, script, indent) {
        if (this.options.jea) {
            this.buffer.push(this.indent(indent) + 'export const ' + name + ' = {');
            this.buffer.push(this.indent(indent + 1) + 'module: module,');
            this.buffer.push(this.indent(indent + 1) + 'command: \'' + command + '\',');
            this.buffer.push(this.indent(indent + 1) + 'script: ' + script + '');
            this.buffer.push(this.indent(indent) + '}');
        }
        else {
            this.buffer.push(this.indent(indent) + 'export const ' + name + ': string = ' + script + ';');
        }
    };
    PsCodeConverter.prototype.addData = function (groups) {
        var groupKeys = Object.keys(groups);
        groupKeys = groupKeys.sort();
        for (var _i = 0, groupKeys_1 = groupKeys; _i < groupKeys_1.length; _i++) {
            var groupKey = groupKeys_1[_i];
            var groupName = this.toPascalName(groupKey);
            var rootGroup = true;
            if (groupKey !== PsCodeConverter.defaultGroup && groupKey !== PsCodeConverter.generatedGroup) {
                rootGroup = false;
            }
            if (!rootGroup) {
                this.addBeginGroup(groupName, 1);
            }
            var current = groups[groupKey];
            var keys = Object.keys(current);
            var _loop_1 = function (key) {
                var script = '';
                var content = current[key];
                var name_1 = this_1.toJsonName(key);
                var command = this_1.toCommandName(key);
                script = '##' + command + '##:' + key + '\n';
                var removeComments = this_1.options.noComments;
                if (content.indexOf(PsCodeConverter.removeCommentsFalse) > 0) {
                    removeComments = false;
                }
                else if (content.indexOf(PsCodeConverter.removeCommentsTrue) > 0) {
                    removeComments = true;
                }
                var skipping = false;
                var lines = content.split('\n');
                lines.forEach(function (value, index, array) {
                    var text = value.replace('\r', '');
                    if (removeComments) {
                        var process_1 = true;
                        text = text.trim();
                        if (text.startsWith(PsCodeConverter.commentStart)) {
                            skipping = true;
                        }
                        if (skipping) {
                            process_1 = false;
                            if (text.endsWith(PsCodeConverter.commentEnd)) {
                                skipping = false;
                            }
                        }
                        if (process_1 && !text.startsWith(PsCodeConverter.comment) && text.length > 0) {
                            script += text + '\n';
                        }
                    }
                    else {
                        script += text + '\n';
                    }
                });
                var data = JSON.stringify(script);
                data = this_1.replaceAll(data, '\'', '\\u0027');
                data = this_1.replaceAll(data, '<', '\\u003c');
                data = this_1.replaceAll(data, '>', '\\u003e');
                data = this_1.replaceAll(data, '&', '\\u0026');
                this_1.addToContent(name_1, command, data, rootGroup ? 1 : 2);
            };
            var this_1 = this;
            for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                var key = keys_1[_a];
                _loop_1(key);
            }
            if (!rootGroup) {
                this.addEndGroup(groupName, 1);
            }
        }
    };
    PsCodeConverter.prototype.indent = function (count) {
        var pad = '';
        for (var i = 0; i < count; i++) {
            pad += '    ';
        }
        return pad;
    };
    PsCodeConverter.defaultGroup = '!!##default__';
    PsCodeConverter.generatedGroup = '!!##generated__';
    PsCodeConverter.verbs = [
        'Add', 'Clear', 'Close', 'Copy', 'Enter', 'Exit', 'Find', 'Format', 'Get',
        'Hide', 'Join', 'Lock', 'Move', 'New', 'Open', 'Optimize', 'Pop', 'Push',
        'Redo', 'Remove', 'Rename', 'Reset', 'Resize', 'Search', 'Select', 'Set',
        'Show', 'Skip', 'Split', 'Step', 'Switch', 'Undo', 'Unlock', 'Watch', 'Backup',
        'Checkpoint', 'Compare', 'Compress', 'Convert', 'ConvertFrom', 'ConvertTo',
        'Dismount', 'Edit', 'Expand', 'Export', 'Group', 'Import', 'Initialize',
        'Limit', 'Merge', 'Mount', 'Out', 'Publish', 'Restore', 'Save', 'Sync',
        'Unpublish', 'Update', 'Approve', 'Assert', 'Complete', 'Confirm', 'Deny',
        'Disable', 'Enable', 'Install', 'Invoke', 'Register', 'Request', 'Restart',
        'Resume', 'Start', 'Stop', 'Submit', 'Suspend', 'Uninstall', 'Unregister',
        'Wait', 'Debug', 'Measure', 'Ping', 'Repair', 'Resolve', 'Test', 'Trace',
        'Connect', 'Disconnect', 'Read', 'Receive', 'Send', 'Write', 'Block',
        'Grant', 'Protect', 'Revoke', 'Unblock', 'Unprotect', 'Use'
    ];
    PsCodeConverter.removeCommentsTrue = '##RemoveComments=true##';
    PsCodeConverter.removeCommentsFalse = '##RemoveComments=false##';
    PsCodeConverter.commentStart = '<#';
    PsCodeConverter.commentEnd = '#>';
    PsCodeConverter.comment = '#';
    PsCodeConverter.openContent = "/* tslint:disable */\r\n/**\r\n * @file Source code generated by gulp-ps-code.\r\n * @version 1.1\r\n */\r\nexport module PowerShellScripts {\r\n    'use strict'\r\n";
    PsCodeConverter.closeContent = "}\r\n";
    return PsCodeConverter;
}());
exports.PsCodeConverter = PsCodeConverter;
//# sourceMappingURL=ps-code-convert.js.map