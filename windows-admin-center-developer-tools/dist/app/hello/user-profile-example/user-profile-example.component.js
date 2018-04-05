var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
import { NotificationState, VersionedObject } from '@msft-sme/shell/core';
/**
 * The Versioned representation of the Hello Extension Settings
 */
var HelloExtensionSettings = /** @class */ (function (_super) {
    __extends(HelloExtensionSettings, _super);
    function HelloExtensionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HelloExtensionSettings.prototype, "latestVersion", {
        /**
         * Getter for the latest version of the user profile.
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloExtensionSettings.prototype, "booleanExample", {
        /**
         * Getter for the example property.
         * You must use 'getProperty' to get values from the internal object properties store
         */
        get: function () {
            return this.getProperty(HelloExtensionSettings.propertyNames.booleanExample);
        },
        /**
         * Setter for the example property.
         * You must use 'setProperty' to set values from the internal object properties store
         */
        set: function (value) {
            this.setProperty(HelloExtensionSettings.propertyNames.booleanExample, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    HelloExtensionSettings.prototype.upgrade = function () {
        // For now, we dont need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, then we need to add logic here to upgrade old settings objects
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.booleanExample = false;
            this.currentVersion = this.latestVersion;
            return;
        }
    };
    HelloExtensionSettings.propertyNames = {
        booleanExample: 'booleanExample'
    };
    return HelloExtensionSettings;
}(VersionedObject));
export { HelloExtensionSettings };
var UserProfileExampleComponent = /** @class */ (function () {
    function UserProfileExampleComponent(appContextService) {
        var _this = this;
        this.appContextService = appContextService;
        appContextService.settingsManager
            .getExtensionUserSettings(HelloExtensionSettings)
            .take(1)
            .subscribe(function (settings) {
            _this.settings = settings;
        }, function (e) {
            _this.settingsFailed = true;
            _this.appContextService.notification.alert(null, NotificationState.Error, "Failed to load user profile", 'User Profile Failed');
        });
    }
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    UserProfileExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().HelloWorld.dll.title;
    };
    UserProfileExampleComponent.prototype.saveSettings = function () {
        var _this = this;
        // Note that 'trySave(<Function>)' is also an option for saving. 
        // It will execute a save and rollback an changes made in <Function>. this is usefull for reverting settings after a save fails.
        // using the 'save' method below will not rollback changes.
        this.settings.save()
            .take(1)
            .subscribe(function () {
            _this.appContextService.notification.alert(null, NotificationState.Success, "This user profile has been updated with " + JSON.stringify(_this.settings.toJson()), 'User Profile Saved');
        }, function (e) {
            _this.appContextService.notification.alert(null, NotificationState.Error, "This user profile failed to save: " + JSON.stringify(_this.settings.toJson()), 'User Profile Failed');
        });
    };
    UserProfileExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-user-profile-example',
                    template: "\n      <div class=\"sme-documentation sme-margin-inset-sm\">\n          <h2>User Profile</h2>\n          <p>\n              This component provides a short overview / example on how to save and retrieve user specific settings for your extension. The values of the form below were restored from user settings for this extension.\n          </p>\n          <h3>Versioned Object</h3>\n          <p>\n              Versioning your data store is a very important part of maintaining forward/backward compatibility. For the reason using the the UserProfileService requires you to extend the VersionedObject class for saving and retrieving your data Here is an example\n              of this in code:\n          </p>\n          <code>\n      /**\n       * The Versioned representation of the Hello Extension Settings\n       */\n      export class HelloExtensionSettings extends VersionedObject {{'{'}}\n    \n          /**\n           * Getter for the latest version of the user profile. \n           */\n          public get latestVersion(): number{{'{'}}\n              return 0;\n          }\n\n          /**\n           * Getter for the example property.\n           * You must use 'getProperty' to get values from the internal object properties store\n           */\n          public get booleanExample(): boolean {{'{'}}\n              return &lt;boolean&gt;this.getProperty('booleanExample')\n          }\n\n          /**\n           * Setter for the example property.\n           * You must use 'setProperty' to set values from the internal object properties store\n           */\n          public set booleanExample(value: boolean) {{'{'}}\n              this.setProperty('booleanExample', value);\n          }\n\n          /**\n           * upgrades the current properties to the latest version\n           * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version\n           */\n          protected upgrade() {{'{'}}\n              // For now, we dont need to do anything but initialize to the latest version.\n              // NOTE: When latestVersion is updated, then we need to add logic here to upgrade old settings objects\n              if (MsftSme.isNullOrUndefined(this.currentVersion)) {{'{'}}\n                  this.clear();\n                  this.booleanExample = false;\n                  this.currentVersion = this.latestVersion;\n                  return;\n              }\n          }\n      }\n          </code>\n          <h3>Example</h3>\n          <div class=\"sme-documentation-example sme-layout-relative sme-position-stretch-h\">\n              <sme-loading-wheel *ngIf=\"!settings && !settingsFailed\"></sme-loading-wheel>\n              <form *ngIf=\"settings\">\n                  <div class=\"sme-checkbox\">\n                      <label>\n                        <input aria-label=\"Boolean Example\" name=\"example-checkbox\" type=\"checkbox\" [(ngModel)]=\"settings.booleanExample\">\n                        <span aria-hidden=\"true\">Boolean Example</span>\n                      </label>\n                  </div>\n                  <div>\n                      <button type=\"submit\" (click)=\"saveSettings()\">Save Settings</button>\n                  </div>\n              </form>\n          </div>\n          <code>\n            // get my extensions settings \n            appContextService.userProfileManager\n              // get the settings into the type for the versionedObject extension we defined earlier\n              .getExtensionSettings(HelloExtensionSettings)\n              .take(1)\n              .flatMap(\n                settings => {{'{'}}\n                    // change settings              \n                    settings.booleanExample = true;\n                    // save the settings\n                    return settings.save();\n\n                    // alternativly we can save and revert if there is a failure.\n                    return settings.trySaver(() => {{'{'}} settings.booleanExample = true; });\n                });\n        \n          </code>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    UserProfileExampleComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return UserProfileExampleComponent;
}());
export { UserProfileExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby91c2VyLXByb2ZpbGUtZXhhbXBsZS91c2VyLXByb2ZpbGUtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUU3RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx5QkFBQSxDQUEwQjtBQUM1RCxPQUFPLEVBQUUsaUJBQUEsRUFBbUIsZUFBQSxFQUF1RCxNQUFPLHNCQUFBLENBQXVCO0FBT2pIOztHQUVHO0FBQ0g7SUFBNEMsMENBQWU7SUFBM0Q7O0lBNENBLENBQUM7SUFuQ0csc0JBQVcsaURBQWE7UUFIeEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLGtEQUFjO1FBSnpCOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3pGLENBQUM7UUFFRDs7O1dBR0c7YUFDSCxVQUEwQixLQUFjO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRixDQUFDOzs7T0FSQTtJQVVEOzs7O09BSUc7SUFDTyx3Q0FBTyxHQUFqQjtRQUNJLDZFQUE2RTtRQUM3RSxzR0FBc0c7UUFDdEcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQztRQUNYLENBQUM7SUFDTCxDQUFDO0lBekNjLG9DQUFhLEdBQUc7UUFDM0IsY0FBYyxFQUFFLGdCQUFnQjtLQUNuQyxDQUFBO0lBd0NMLDZCQUFDO0NBNUNELEFBNENDLENBNUMyQyxlQUFlLEdBNEMxRDtTQTVDWSxzQkFBc0I7QUErQ25DO0lBY0kscUNBQW9CLGlCQUFvQztRQUF4RCxpQkFnQkM7UUFoQm1CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEQsaUJBQWlCLENBQUMsZUFBZTthQUM1Qix3QkFBd0IsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsU0FBUyxDQUNWLFVBQUEsUUFBUTtZQUNKLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQzVCLENBQUMsRUFDRCxVQUFBLENBQUM7WUFDRyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDckMsSUFBSSxFQUNKLGlCQUFpQixDQUFDLEtBQUssRUFDdkIsNkJBQTZCLEVBQzdCLHFCQUFxQixDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBeEJEOzs7T0FHRztJQUNXLDJDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUNwRSxDQUFDO0lBb0JPLGtEQUFZLEdBQXBCO1FBQUEsaUJBc0JDO1FBckJHLGlFQUFpRTtRQUNqRSxnSUFBZ0k7UUFDaEksMkRBQTJEO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2FBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLFNBQVMsQ0FDVjtZQUNJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUNyQyxJQUFJLEVBQ0osaUJBQWlCLENBQUMsT0FBTyxFQUN6Qiw2Q0FBMkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFHLEVBQ25GLG9CQUFvQixDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUNELFVBQUEsQ0FBQztZQUNHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUNyQyxJQUFJLEVBQ0osaUJBQWlCLENBQUMsS0FBSyxFQUN2Qix1Q0FBcUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFHLEVBQzdFLHFCQUFxQixDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBQ0Usc0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsa2dJQTBGVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMENBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBRjZGLENBRTdGLENBQUM7SUFDRixrQ0FBQztDQTNKRCxBQTJKQyxJQUFBO1NBM0pZLDJCQUEyQiIsImZpbGUiOiJ1c2VyLXByb2ZpbGUtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9