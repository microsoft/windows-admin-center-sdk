import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

const code = {
    example1: `<button>Button</button>
<button disabled>Disabled Button</button>`,
    example2: `<button class="sme-button-primary">Button</button>
<button class="sme-button-primary" disabled>Disabled Button</button>
<button type="submit">Submit</button>
<button class="sme-button-primary sme-button-critical">Critical</button>
<button class="sme-button-primary sme-button-critical" disabled>Critical Disabled</button>
<button class="sme-button-primary sme-button-warning">Warning</button>
<button class="sme-button-primary sme-button-warning" disabled>Warning Disabled</button>`,
    example3: `<button class="sme-button-trigger">Button</button>
<button class="sme-button-trigger" disabled>Disabled Button</button>`,
    example4: `<a role="button" class="sme-button">Anchor Button</a>
<a role="button" class="sme-button" disabled>Anchor Disabled Button</a>
<a role="button" class="sme-button sme-button-primary">Anchor Primary Button</a>
<a role="button" class="sme-button sme-button-primary" disabled>Anchor Primary Disabled Button</a>
<a role="button" class="sme-button sme-button-trigger">Anchor Trigger Button</a>
<a role="button" class="sme-button sme-button-trigger" disabled>Anchor Trigger Disabled Button</a>`,
    example5: `<div role="button" class="sme-button">Div Button</div>
<div role="button" class="sme-button sme-disabled" disabled>Div Disabled Button</div>
<div role="button" class="sme-button sme-button-primary">Div Primary Button</div>
<div role="button" class="sme-button sme-button-primary sme-disabled" disabled>Div Primary Disabled Button</div>
<div role="button" class="sme-button sme-button-trigger">Div Trigger Button</div>
<div role="button" class="sme-button sme-button-trigger" disabled>Div Trigger Disabled Button</div>`
};
@Component({
    selector: 'sme-dev-guide-styles-forms-button',
    templateUrl: './button-styles.component.html'
})
@NavigationTitle({
    getTitle: () => 'Button Styles'
})
export class ButtonStylesComponent {

    public code = code;
}
