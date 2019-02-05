import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BannerItem } from '@msft-sme/angular';
import { DialogService } from '@msft-sme/angular';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-banner-example',
    templateUrl: './banner-example.component.html'
})
export class BannerExampleComponent implements OnInit {
    public bannerItems: BannerItem[] = [];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-banner';
    }

    constructor(public dialogService: DialogService) {}

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
        const subject = this.dialogService.show('message-dialog', {
            buttonText: 'Close',
            message: 'Set up this service!',
            title: 'Set up now title'
        });

        subject.subscribe((result) => {
            //
        });
    }
}
