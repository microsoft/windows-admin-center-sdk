// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-styles',
    templateUrl: './styles.component.html'
})
export class StylesComponent {
    public links = [
        { href: 'accessibility', text: 'Accessibility' },
        { href: 'behaviors', text: 'Behaviors' },
        { href: 'colors', text: 'Colors' },
        { href: 'forms', text: 'Forms' },
        { href: 'icons', text: 'Icons' },
        { href: 'layers', text: 'Layers' },
        { href: 'layout', text: 'Layout' },
        { href: 'links', text: 'Links' },
        { href: 'pivot', text: 'Pivots' },
        { href: 'progress', text: 'Progress' },
        { href: 'schemes', text: 'Schemes' },
        { href: 'shadows', text: 'Shadows' },
        { href: 'spacing', text: 'Spacing' },
        { href: 'themes', text: 'Themes' },
        { href: 'typography', text: 'Typography' }
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Styles';
    }

}
