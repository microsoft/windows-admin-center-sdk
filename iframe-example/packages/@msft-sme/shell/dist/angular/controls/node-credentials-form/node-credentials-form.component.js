import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorizationManager } from '../../../core';
import { AppContextService } from '../../service';
/**
 * Credentials Form Component:
 *
 * TODO:
 * 1. Convert to using angular form controls
 * 2. Convert to be a form control
 * 3. The authentication flow is expected to change darastically between now and GA.
 *    It doesnt make sense to put much effort into this control at this time
 */
var NodeCredentialsFormComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the NodeCredentialsForm class.
     */
    function NodeCredentialsFormComponent(appContextService) {
        this.appContextService = appContextService;
        this.strings = MsftSme.resourcesStrings();
        this.hasPerNodeCredentials = false;
        /**
         * Model to hold internal form field values;
         */
        this.model = {
            username: '',
            password: '',
            applyToAll: false,
            useLaps: false,
            lapsLocalAdminName: '',
            useGlobalAuth: false
        };
        this.credentialsChanged = new EventEmitter();
        this.showApplyToAll = true;
    }
    Object.defineProperty(NodeCredentialsFormComponent.prototype, "username", {
        get: function () {
            return this.model.username;
        },
        /**
         * Gets or sets the Username
         */
        set: function (value) {
            this.model.username = value;
            this.updateAuthorizationCredentials();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeCredentialsFormComponent.prototype, "password", {
        get: function () {
            return this.model.password;
        },
        /**
         * Gets or sets the password
         */
        set: function (value) {
            this.model.password = value;
            this.updateAuthorizationCredentials();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeCredentialsFormComponent.prototype, "applyToAll", {
        get: function () {
            return this.model.applyToAll;
        },
        /**
         * Gets or sets a value indicating if these settings should be applied to all nodes
         */
        set: function (value) {
            this.model.applyToAll = value;
            this.updateAuthorizationCredentials();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeCredentialsFormComponent.prototype, "useLaps", {
        get: function () {
            return this.model.useLaps;
        },
        /**
         * Gets or sets a value indicating if LAPS should be used
         */
        set: function (value) {
            this.model.useLaps = value;
            this.updateAuthorizationCredentials();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeCredentialsFormComponent.prototype, "lapsLocalAdminName", {
        get: function () {
            return this.model.lapsLocalAdminName;
        },
        /**
         * Gets or sets the laps Local Admin Name
         */
        set: function (value) {
            this.model.lapsLocalAdminName = value;
            this.updateAuthorizationCredentials();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeCredentialsFormComponent.prototype, "useGlobalAuth", {
        get: function () {
            return this.model.useGlobalAuth;
        },
        /**
         * Gets or sets a value indicating if global auth should be used
         */
        set: function (value) {
            this.model.useGlobalAuth = value;
            this.updateAuthorizationCredentials();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Angular component initialization method
     */
    NodeCredentialsFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appContextService.gateway
            .get("gateway/status")
            .take(1)
            .subscribe(function (gateway) {
            _this.isServiceMode = gateway.gatewayMode === 'Service';
        });
    };
    NodeCredentialsFormComponent.prototype.reset = function (nodeName) {
        // TODO: handle no nodeNames provided
        this.applyToAll = false;
        this.password = null;
        this.username = null;
        this.useLaps = false;
        this.lapsLocalAdminName = AuthorizationManager.defaultLapsLocalAdminName; // Show default value, users can change.
        this.useGlobalAuth = true;
        this.hasPerNodeCredentials = Object.keys(this.appContextService.authorizationManager.nodeTokens).length > 0;
        var nodeToken = this.appContextService.authorizationManager.nodeTokens[nodeName];
        var globalToken = this.appContextService.authorizationManager.manageAsToken;
        if (nodeToken) {
            this.useGlobalAuth = false;
            this.username = nodeToken.username;
        }
        if (globalToken) {
            this.globalUsername = globalToken.username;
        }
    };
    NodeCredentialsFormComponent.prototype.updateAuthorizationCredentials = function () {
        var authCreds = {
            username: this.username,
            password: this.password,
            applyToAllNodes: this.applyToAll,
            useLaps: false,
            lapsLocalAdminName: this.lapsLocalAdminName
        };
        if (this.useGlobalAuth) {
            authCreds.username = null;
            authCreds.password = null;
            authCreds.applyToAllNodes = false;
            authCreds.useLaps = this.useLaps;
            authCreds.lapsLocalAdminName = this.lapsLocalAdminName;
        }
        this.credentialsChanged.next(authCreds);
    };
    NodeCredentialsFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-node-credentials-form',
                    template: "\n      <form name=\"manageAs\">\n        <div class=\"form-group\">\n          <div class=\"radio\">\n            <label>\n                <input type=\"radio\" name='authType' [(ngModel)]=\"useGlobalAuth\" [value]=\"true\">\n                <span>{{strings.MsftSmeShell.Angular.NodeCredentialsForm.UseGlobalAuth.labelFormat | smeFormat:(globalUsername || strings.MsftSmeShell.Angular.NodeCredentialsForm.UseGlobalAuth.myAccount)}}</span>\n            </label>\n          </div>\n          <div *ngIf=\"!isServiceMode\" class=\"checkbox indent\" [class.disabled]=\"!useLaps || !useGlobalAuth\">\n            <label>\n                <input type=\"checkbox\" name=\"useLaps\" [(ngModel)]=\"useLaps\" [disabled]=\"!useGlobalAuth\"/>\n                <span>{{strings.MsftSmeShell.Angular.NodeCredentialsForm.UseLaps.label}}</span>\n            </label>\n          </div>\n            <div *ngIf=\"!isServiceMode\" class=\"form-group indent\" [class.disabled]=\"!useLaps || !useGlobalAuth\">\n              <label for=\"lapsLocalAdminName\" class=\"indent control-label\">{{strings.MsftSmeShell.Angular.NodeCredentialsForm.lapsLocalAdminName.label}}</label>\n              <input type=\"text\" class=\"indent form-control\" id=\"lapsLocalAdminName\" name=\"lapsLocalAdminName\" [(ngModel)]=\"lapsLocalAdminName\"\n                [disabled]=\"!useLaps || !useGlobalAuth\" [placeholder]=\"strings.MsftSmeShell.Angular.NodeCredentialsForm.lapsLocalAdminName.placeholder\"\n              />\n            </div>        \n          <div class=\"radio\">\n            <label>\n                <input type=\"radio\" name='authType' [(ngModel)]=\"useGlobalAuth\" [value]=\"false\">\n                <span>{{strings.MsftSmeShell.Angular.NodeCredentialsForm.UsePerNodeAuth.label}}</span>\n            </label>\n          </div>\n          <div class=\"indent\" [class.disabled]=\"useGlobalAuth\">\n            <div class=\"form-group\">\n              <label for=\"username\" class=\"control-label\">{{strings.MsftSmeShell.Angular.NodeCredentialsForm.Username.label}}</label>\n              <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" [placeholder]=\"strings.MsftSmeShell.Angular.NodeCredentialsForm.Username.placeholder\"\n                [(ngModel)]=\"username\" autofocus [disabled]=\"useGlobalAuth\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"password\" class=\"control-label\">{{strings.MsftSmeShell.Angular.NodeCredentialsForm.Password.label}}</label>\n              <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" [placeholder]=\"strings.MsftSmeShell.Angular.NodeCredentialsForm.Password.placeholder\"\n                [(ngModel)]=\"password\" [disabled]=\"useGlobalAuth\">\n            </div>\n            <div class=\"checkbox\" *ngIf=\"showApplyToAll\">\n              <label>\n                <input type=\"checkbox\" name=\"applyToAll\" [(ngModel)]=\"applyToAll\" [disabled]=\"useGlobalAuth\"/>\n                <span>{{strings.MsftSmeShell.Angular.NodeCredentialsForm.ApplyToAll.label}}</span>\n            </label>\n            </div>\n\n            <!-- Warnings -->\n            <div *ngIf=\"!useGlobalAuth\">\n              <div class=\"col-md-3 info-icon-div\">\n                <div class=\"sme-icon sme-icon-warning icon-size info-icon\"> </div>\n              </div>\n              <p>{{strings.MsftSmeShell.Angular.NodeCredentialsForm.UseGlobalAuth.warning}}</p>\n              <div *ngIf=\"hasPerNodeCredentials && applyToAll\">\n                <div class=\"col-md-3 info-icon-div\">\n                  <div class=\"sme-icon sme-icon-warning icon-size info-icon\"> </div>\n                </div>\n                <p> {{strings.MsftSmeShell.Angular.NodeCredentialsForm.ApplyToAll.warning}}</p>\n              </div>\n            </div>\n            <div *ngIf=\"useGlobalAuth && isServiceMode\">\n              <div class=\"col-md-3 info-icon-div\">\n                <div class=\"sme-icon sme-icon-warning icon-size info-icon\"> </div>\n              </div>\n              <p>{{strings.MsftSmeShell.Angular.NodeCredentialsForm.deploymentGuideMessage}}</p>\n            </div>\n          </div>\n        </div>\n      </form>\n    ",
                    styles: ["\n      .info-icon-div {\n        width: 20px;\n        text-align: center;\n        margin-right: 0px;\n        height: 20px;\n        padding-left: 0px;\n      }\n\n      .info-icon {\n        vertical-align: middle;\n        font-size: 20px;\n        height: 20px;\n        line-height: 20px;\n      }\n\n      .indent-list {\n        padding-left: 20px;\n        font-size: 13px;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    NodeCredentialsFormComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    NodeCredentialsFormComponent.propDecorators = {
        'credentialsChanged': [{ type: Output },],
        'showApplyToAll': [{ type: Input },],
    };
    return NodeCredentialsFormComponent;
}());
export { NodeCredentialsFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbm9kZS1jcmVkZW50aWFscy1mb3JtL25vZGUtY3JlZGVudGlhbHMtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxZQUFBLEVBQWMsS0FBQSxFQUFlLE1BQUEsRUFBTyxNQUFPLGVBQUEsQ0FBZ0I7QUFHL0UsT0FBTyxFQUE0QixvQkFBQSxFQUFxQixNQUFPLGVBQUEsQ0FBZ0I7QUFHL0UsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUlsRDs7Ozs7Ozs7R0FRRztBQUNIO0lBMEZJOztPQUVHO0lBQ0gsc0NBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBNUZqRCxZQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFFdkQsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBcUVyQzs7V0FFRztRQUNLLFVBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsS0FBSztZQUNqQixPQUFPLEVBQUUsS0FBSztZQUNkLGtCQUFrQixFQUFFLEVBQUU7WUFDdEIsYUFBYSxFQUFFLEtBQUs7U0FDdkIsQ0FBQztRQUdLLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUE0QixDQUFDO1FBR2xFLG1CQUFjLEdBQUcsSUFBSSxDQUFDO0lBTTdCLENBQUM7SUFyRkQsc0JBQVcsa0RBQVE7YUFJbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQztRQVREOztXQUVHO2FBQ0gsVUFBb0IsS0FBYTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFRRCxzQkFBVyxrREFB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QUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRU0scUVBQThCLEdBQXJDO1FBQ0ksSUFBSSxTQUFTLEdBQTZCO1lBQ3RDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsZUFBZSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ2hDLE9BQU8sRUFBRSxLQUFLO1lBQ2Qsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtTQUM5QyxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDMUIsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDMUIsU0FBUyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDbEMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDM0QsQ0FBQztRQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNFLHVDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFLGdxSUFtRVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUMsZ1pBb0JSLENBQUM7aUJBQ0wsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUY2RixDQUU3RixDQUFDO0lBQ0ssMkNBQWMsR0FBMkM7UUFDaEUsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0tBQ25DLENBQUM7SUFDRixtQ0FBQztDQS9QRCxBQStQQyxJQUFBO1NBL1BZLDRCQUE0QiIsImZpbGUiOiJub2RlLWNyZWRlbnRpYWxzLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==