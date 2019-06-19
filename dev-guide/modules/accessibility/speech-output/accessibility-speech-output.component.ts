import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-accessibility-speech-output',
    templateUrl: './accessibility-speech-output.component.html'
})
@NavigationTitle({
    getTitle: () => 'Application Speech output'
})
export class AccessibilitySpeechOutputComponent { }
