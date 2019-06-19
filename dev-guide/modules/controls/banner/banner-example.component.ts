import { Component, OnInit } from '@angular/core';
import { AppContextService, BannerItem } from '@msft-sme/angular';
import { DialogService } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-banner',
    templateUrl: './banner-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Banner Component'
})
export class BannerExampleComponent implements OnInit {
    public bannerItems: BannerItem[] = [];

    constructor(public appContextService: AppContextService) {}

    public ngOnInit() {
        const firstBanner: BannerItem = {
            icon: 'sme-icon:sme-icon-azureLogo',
            id: 'msft.sme.firstBanner',
            serviceName: 'First Banner Example',
            title: 'First Banner Title',
            externalLink: 'http://www.bing.com'
        };
        firstBanner.setUpFunction = () => { this.onSetupClick(); };

        const secondBanner: BannerItem = {
            icon: 'sme-icon:sme-icon-azureLogo',
            id: 'msft.sme.secondBanner',
            serviceName: 'Second Banner Example',
            title: 'Second Banner Title',
            externalLink: 'http://www.bing.com'
        };

        this.bannerItems = [firstBanner, secondBanner];
    }

    public onSetupClick(): void {
        this.appContextService.frame.showDialogMessage({
            buttonText: 'Close',
            message: 'Set up this service!',
            title: 'Set up now title'
        }).subscribe();
    }
}
