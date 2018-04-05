'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var gutil = require("gulp-util");
var through2 = require("through2");
var Vinyl = require("vinyl");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-ps-cim';
function gulpPowerShellCim(options) {
    function extendError(pError, error) {
        if (error && (typeof error === 'object')) {
            ['name', 'errno'].forEach(function (property) {
                if (property in error) {
                    // tslint:disable-next-line:no-invalid-this
                    this[property] = error[property];
                }
            }, pError);
        }
        return pError;
    }
    //
    // (Options):
    //
    // override options settings if not specified.
    options = Object.assign(options || {});
    var collection = null;
    return through2.obj(
    /**
     * @this {Transform}
     */
    function (file, encoding, callback) {
        collection = JSON.parse(file.contents.toString()).collection;
        return callback();
    }, 
    /**
     * @this {Flush}
     */
    function (callback) {
        try {
            for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
                var mapData = collection_1[_i];
                var contents = cimScript(mapData).join('\r\n');
                var scriptFile = new Vinyl({
                    cwd: './',
                    path: mapData.name + '.ps1',
                    contents: new Buffer(contents, 'utf8')
                });
                // tslint:disable-next-line:no-invalid-this
                this.push(scriptFile);
            }
        }
        catch (e) {
            var error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
            gutil.log(error);
        }
        callback();
    });
}
function cimScript(mapData) {
    var line;
    var bodySection = [];
    var commentSection = [];
    var paramSection = [];
    commentSection.push('<#', '', '.SYNOPSIS', mapData.description, '', '.DESCRIPTION', mapData.description, '', '.ROLE');
    commentSection.push.apply(commentSection, mapData.roles),
        commentSection.push('', '.COMPONENT');
    commentSection.push.apply(commentSection, mapData.components);
    commentSection.push('', '#>');
    switch (mapData.type) {
        case 'getInstanceMultiple':
        case 'getBatchInstanceMultiple':
            // namespace the cim namespace.
            // className the class name.
            line = "Get-CimInstance -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            bodySection.push(line);
            break;
        case 'getInstanceSingle':
        case 'getBatchInstanceSingle':
            // namespace the cim namespace.
            // lassName the class name.
            // keyProperties the key properties object
            var parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "$keyInstance = New-CimInstance -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            line += " -Key @(" + parameters.keyLine + ") -Property @{" + parameters.propertyLine + "} -ClientOnly";
            bodySection.push(line);
            line = 'Get-CimInstance $keyInstance';
            bodySection.push(line);
            break;
        case 'invokeMethodInstance':
        case 'invokeBatchMethodInstance':
            // namespace the cim namespace.
            // className the class name.
            // methodName the method name.
            // keyProperties the key properties object.
            // data the method input data.
            parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "$keyInstance = New-CimInstance -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            line += " -Key @(" + parameters.keyLine + ") -Property @{" + parameters.propertyLine + "} -ClientOnly";
            bodySection.push(line);
            line = "Invoke-CimMethod $keyInstance -MethodName " + mapData.methodName;
            if (parameters.argumentsLine) {
                line += " -Arguments @{" + parameters.argumentsLine + "}";
            }
            bodySection.push(line);
            break;
        case 'invokeMethodStatic':
        case 'invokeBatchMethodStatic':
            // namespace the cim namespace.
            // className the class name.
            // methodName the method name.
            // data the method input data.
            parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "Invoke-CimMethod -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            line += " -MethodName " + mapData.methodName;
            if (parameters.argumentsLine) {
                line += " -Arguments @{" + parameters.argumentsLine + "}";
            }
            bodySection.push(line);
            break;
        case 'setInstance':
        case 'setBatchInstance':
            // namespace the cim namespace.
            // lassName the class name.
            // keyProperties the key properties object.
            // data the method input data.
            parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "New-CimInstance -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            line += " -Key @(" + parameters.keyLine + ") -Property @{" + parameters.propertyLine + parameters.argumentsLine + "}";
            bodySection.push(line);
            break;
        case 'modifyInstance':
        case 'modifyBatchInstance':
            // namespace the cim namespace.
            // className the class name.
            // keyProperties the key properties object.
            // data the method input data.
            parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "$instance = New-CimInstance -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            line += " -Key @(" + parameters.keyLine + ") -Property @{" + parameters.propertyLine + "} -ClientOnly";
            bodySection.push(line);
            line = '$instance = Get-CimInstance $instance';
            bodySection.push(line);
            bodySection.push.apply(bodySection, parameters.updateSection);
            line = 'Set-CimInstance $instance';
            bodySection.push(line);
            break;
        case 'deleteInstance':
        case 'deleteBatchInstance':
            // namespace the cim namespace.
            // className the class name.
            // keyProperties the key properties object.
            parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "$instance = New-CimInstance -Namespace " + mapData.namespace + " -ClassName " + mapData.className;
            line += " -Key @(" + parameters.keyLine + ") -Property @{" + parameters.propertyLine + "} -ClientOnly";
            bodySection.push(line);
            line = 'Remove-CimInstance $instance';
            bodySection.push(line);
            break;
        case 'getInstanceQuery':
        case 'getBatchInstanceQuery':
            // namespace the cim namespace.
            // query the WQL string.
            parameters = keyArgumentsParameters(mapData);
            paramSection = parameters.paramSection;
            line = "Get-CimInstance -Namespace " + mapData.namespace + " -Query \"" + mapData.query + "\"";
            bodySection.push(line);
            break;
    }
    var content = [];
    content.push.apply(content, commentSection);
    content.push('');
    content.push.apply(content, paramSection);
    content.push('');
    content.push.apply(content, bodySection);
    content.push('');
    return content;
}
function keyArgumentsParameters(mapData) {
    var paramSection = [];
    paramSection.push('Param(');
    var keyLine = null;
    var keySeparator = '';
    var propLine = null;
    var dataLine = null;
    if (mapData.keyProperties) {
        keyLine = '';
        propLine = '';
        for (var _i = 0, _a = mapData.keyProperties; _i < _a.length; _i++) {
            var key = _a[_i];
            paramSection.push("[" + key.type + "]$" + key.name);
            keyLine += keySeparator + "'" + key.name + "'";
            propLine += key.name + "=$" + key.name + ";";
            keySeparator = ',';
        }
    }
    var updateSection = [];
    updateSection.push('');
    if (mapData.arguments) {
        dataLine = '';
        for (var _b = 0, _c = mapData.arguments; _b < _c.length; _b++) {
            var data = _c[_b];
            paramSection.push("[" + data.type + "]$" + data.name);
            dataLine += data.name + "=$" + data.name + ";";
            updateSection.push("$instance." + data.name + "=$" + data.name);
        }
    }
    if (paramSection.length > 2) {
        for (var i = 1; i < paramSection.length - 1; i++) {
            paramSection[i] += ',';
        }
    }
    paramSection.push(')');
    return {
        keyLine: keyLine,
        propertyLine: propLine,
        argumentsLine: dataLine,
        updateSection: updateSection,
        paramSection: paramSection
    };
}
module.exports = gulpPowerShellCim;
//# sourceMappingURL=index.js.map