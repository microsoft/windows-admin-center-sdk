import { Component } from '@angular/core';
import { ExtensionBrokerService, NavigationTitle } from '@msft-sme/angular';
import { EnvironmentModuleEntryPointType } from '@msft-sme/core/manifest/environment-modules';

@Component({
    selector: 'sme-dev-guide-controls-snap-in-extension',
    templateUrl: './snap-in-extension-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Snap-in Extension'
})
export class SnapInExtensionExampleComponent {

    constructor(private extensionBroker: ExtensionBrokerService) { }

    /**
     * The source name to use for logging
     */
    protected get logSourceName() {
        return 'SnapInExtensionExampleComponent';
    }

    /**
     * to be used when discover extension dialog is hooked up
     */
    public showSnapInDiscoveryDialog() {
        this.extensionBroker.showDialog(
            'msft.sme.shell-extensions!discoverExtensionsDialog',
            0,
            [EnvironmentModuleEntryPointType.SnapIn]);
    }
}
