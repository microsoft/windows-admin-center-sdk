// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    AppContextService, CapacityDoughnutChartComponent, CapacityDoughnutChartData, DoughnutChartData
} from '@microsoft/windows-admin-center-sdk/angular';

@Component({
    selector: 'sme-doughnut-chart-example',
    templateUrl: './doughnut-chart-example.component.html'
})
export class DoughnutChartExampleComponent implements AfterViewInit {
    @ViewChild('capacityChart1') public chart1: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart2') public chart2: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart3') public chart3: CapacityDoughnutChartComponent;
    public doughnutChartData: DoughnutChartData[] = [];
    public capacityChartData: CapacityDoughnutChartData[] = [];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-doughnut-chart';
    }

    constructor() {
        this.doughnutChartData.push({
            label: 'Computed',
            value: 50,
            color: 'blue'
        });

        this.doughnutChartData.push({
            label: 'Free',
            value: 50,
            color: '#DDD'
        });

        this.capacityChartData.push({
            label: 'VM',
            value: 80
        });

        this.capacityChartData.push({
            label: 'Non-VM',
            value: 16
        });
    }

    public ngAfterViewInit(): void {
        // show yellow threshold
        setTimeout(() => {
            this.capacityChartData[0].value = 72;
            this.chart1.refresh();
            this.chart2.refresh();
            this.chart3.refresh();
        },         5000);

        // show green threshold
        setTimeout(() => {
            this.capacityChartData[0].value = 53;
            this.chart1.refresh();
            this.chart2.refresh();
            this.chart3.refresh();
        },         10000);
    }
}
