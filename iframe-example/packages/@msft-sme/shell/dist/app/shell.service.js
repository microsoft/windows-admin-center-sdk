import { Injectable } from '@angular/core';
import { AppContextService } from '../angular';
import { InventoryQueryCaches, RpcInboundCommands, RpcSettingsOperationType, RpcSettingsProviderType, RpcSettingsScope } from '../core';
import { ShellUserSettings } from './modules/user-profile/models/shell-user-settings';
import { UserProfileService } from './modules/user-profile/user-profile.service';
var ShellService = /** @class */ (function () {
    /**
     * Initializes a new instance of the ShellService class.
     *
     * @param appContextService the AppContextService class instance.
     * @param userProfileService the UserProfileService class instance.
     */
    function ShellService(appContextService, userProfileService) {
        var _this = this;
        this.appContextService = appContextService;
        this.userProfileService = userProfileService;
        var statusExpiration = 4 * 60 * 1000; // 4 min
        var versionExpiration = 4 * 60 * 60 * 1000; // 4 hrs
        this.inventoryCaches = new InventoryQueryCaches(this.appContextService, {
            serverCache: { expiration: statusExpiration },
            gatewayCache: { expiration: statusExpiration },
            gatewayCombinedCache: { expiration: versionExpiration },
            toolCache: { expiration: statusExpiration }
        });
        this.rootSubscription = this.inventoryCaches.serverCache.createObservable().subscribe();
        this.rootSubscription.add(this.inventoryCaches.gatewayCache.createObservable().subscribe());
        this.rootSubscription.add(this.inventoryCaches.gatewayCombinedCache.createObservable().subscribe());
        // listen for and handle rpc settings messages 
        this.appContextService.rpc.moduleSubjects(RpcInboundCommands.Settings)
            .subscribe(function (data) { return _this.handleRpcSettingsRequest(data); });
    }
    /**
     * Get the extension user settings for the shell
     */
    ShellService.prototype.getShellUserSettings = function () {
        var _this = this;
        var name = window.MsftSme.Environment.name;
        return this.userProfileService.getExtensionSettings(name).map(function (settings) {
            return new ShellUserSettings(settings, {
                save: function (object) { return _this.userProfileService.setExtensionSettings(name, object); }
            });
        });
    };
    /**
     * Message handler for user profile rpc requests
     * @param request the rpc request
     */
    ShellService.prototype.handleRpcSettingsRequest = function (request) {
        // if the request is invalid, then fail
        if (!request || !request.data) {
            var message = "Invalid RPC Settings Request.";
            request.deferred.reject(message);
            return;
        }
        // create placeholder for the actual operation handler
        var handler;
        // find the actual operation handler
        if (request.data.scope === RpcSettingsScope.User) {
            // User Scope
            if (request.data.operation === RpcSettingsOperationType.Get) {
                // Get Request
                if (request.data.provider === RpcSettingsProviderType.Common) {
                    // Common Provider
                    handler = this.userProfileService.getCommonSettings();
                }
                else if (request.data.provider === RpcSettingsProviderType.Extension) {
                    // Extension Provider
                    handler = this.userProfileService.getExtensionSettings(request.data.sourceName);
                }
            }
            else if (request.data.operation === RpcSettingsOperationType.Set) {
                // Set Request
                if (request.data.provider === RpcSettingsProviderType.Extension) {
                    // Extension Provider
                    handler = this.userProfileService.setExtensionSettings(request.data.sourceName, request.data.value);
                }
                // TODO: Evaluate if there is a need to set common settings from extensions or if they are readonly
            }
        }
        else if (request.data.scope === RpcSettingsScope.Application) {
            // Application Scope
            // TODO: implement RpcSettingsScope.Application Requests
        }
        // if no handler was found, then fail
        if (!handler) {
            var scopeName = this.formatHandlerErrorEnumName(request.data.scope, RpcSettingsOperationType[request.data.scope], 'Scope');
            var operationName = this.formatHandlerErrorEnumName(request.data.operation, RpcSettingsOperationType[request.data.operation], 'Operation');
            var providerName = this.formatHandlerErrorEnumName(request.data.provider, RpcSettingsProviderType[request.data.provider], 'Provider');
            var message = scopeName + " " + operationName + " operations are not allowed for " + providerName + " settings";
            request.deferred.reject(message);
            return;
        }
        // listen to handler and resolve or reject the request accordingly
        handler.take(1).subscribe(function (data) { request.deferred.resolve({ data: data }); }, function (error) { request.deferred.reject(error); });
    };
    /**
     * Gets a formatted representation of an enum value for handler errors.
     * @param value the enum value
     * @param valueName the enum value name
     * @param enumTypeName  the enum type name
     */
    ShellService.prototype.formatHandlerErrorEnumName = function (value, valueName, enumTypeName) {
        if (MsftSme.isNullOrUndefined(value)) {
            return "'Unknown " + enumTypeName + " (" + value + ")'";
        }
        return valueName;
    };
    /**
     * Compares two software versions, assuming that a valid version is a 4 part dot separated number.
     *
     * @param currentVersion The current software version.
     * @param targetVersion The version that is available for download.
     *
     * @returns 0 if versions are the same; 1 if a newer version is available for download; -1 for a current version that is downlevel.
     */
    ShellService.prototype.compareVersions = function (currentVersion, targetVersion) {
        if (MsftSme.isNull(currentVersion) || MsftSme.isNull(targetVersion)) {
            return 0;
        }
        var currentVersionParts = currentVersion.split('.').map(Number);
        // Target version is going to be hyphen separated as opposed to dot; due to limitations from aka.ms site.
        var targetVersionParts = targetVersion.split('-').map(Number);
        // We don't want to be too strict on the format; and allow ourselves room for
        // change in the future without breaking customers experience.
        if (currentVersionParts.length !== 4 || targetVersionParts.length !== 4) {
            return 0;
        }
        // Always assuming a 4 part number.
        for (var i = 0; i <= 3; i++) {
            if (targetVersionParts[i] === currentVersionParts[i]) {
                continue;
            }
            else if (targetVersionParts[i] > currentVersionParts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }
        return 0;
    };
    ShellService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ShellService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: UserProfileService, },
    ]; };
    return ShellService;
}());
export { ShellService };
//# sourceMappingURL=data:application/json;base64,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