// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    AppContextService,
    ByteUnitConverterPipe,
    CapacityBarChartComponent,
    CapacityBarChartUpdateData,
    CustomHorizontalBarChartData,
    HorizontalBarChartComponent
} from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-horizontal-bar-chart-example',
    templateUrl: './horizontal-bar-chart-example.component.html'
})
export class HorizontalBarChartExampleComponent implements OnInit {
    public multiBarData: CustomHorizontalBarChartData;
    public randomData: CustomHorizontalBarChartData;
    public randomTotal: number;
    public randomUsed: number;
    public randomFree: number;
    public criticalChartTotal: number;
    public criticalChartUsed: number;
    public criticalChartFree: number;

    public legend: ChartLegendOptions;
    public tooltips: ChartTooltipOptions;
    public animation: ChartAnimationOptions;

    public showCapacityLabelTooltip = false;

    @ViewChild('chart1') private chart1: HorizontalBarChartComponent;
    @ViewChildren('chart2a, chart2b') private chart2QueryList: QueryList<CapacityBarChartComponent>;

    public byteUnitConverter = new ByteUnitConverterPipe();

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-horizontal-bar-chart';
    }

    /**
     * Gets random data to demonstrate chart refreshing
     */
    public getRandomDataForHorizontalBarChart(): number[] {
        let tmpTotal = 100;
        let tmpData0 = Math.floor(Math.random() * 30);
        let tmpData1 = Math.floor(Math.random() * 60);
        let tmpData2 = tmpTotal - tmpData0 - tmpData1;

        return [tmpData0, tmpData1, tmpData2];
    }

    public getRandomDataForCapacityChart(): CapacityBarChartUpdateData {
        let randomTotal = 10000000000 * Math.random();
        let randomUsed = Math.random() * randomTotal;
        let freeCapacity = randomTotal - randomUsed;
        let usedLabel = this.byteUnitConverter.transform(randomUsed, 1024);
        let freeLabel = this.byteUnitConverter.transform(freeCapacity, 1024);
        let totalLabel = this.byteUnitConverter.transform(randomTotal, 1024);

        return {
            totalCapacity: randomTotal,
            capacityUsed: randomUsed,
            usedLabel: usedLabel,
            freeLabel: freeLabel,
            totalLabel: totalLabel
        };
    }

    public redrawCharts(): void {
        let newHorizontalBarChartData = this.getRandomDataForHorizontalBarChart();
        this.chart1.update(newHorizontalBarChartData);

        let newCapacityData: CapacityBarChartUpdateData = this.getRandomDataForCapacityChart();

        this.chart2QueryList.forEach((chart: CapacityBarChartComponent) => {
            chart.update(newCapacityData);
        });
    }

    public getStartingData(): CustomHorizontalBarChartData {
        let total = 100;
        let data1 = 30;
        let data2 = 60;
        let data3 = total - data1 - data2;

        return {
            total: total,
            labels: [''],
            datasets: [
                {
                    label: 'bar 1',
                    backgroundColor: 'green',
                    data: [data1]
                },
                {
                    label: 'bar 2',
                    backgroundColor: 'orange',
                    data: [data2]
                },
                {
                    label: 'bar 3',
                    backgroundColor: 'black',
                    data: [data3]
                }
            ]
        };
    }

    public ngOnInit() {
        let randomCapacityData = this.getRandomDataForCapacityChart();
        this.randomTotal = randomCapacityData.totalCapacity;
        this.randomUsed = randomCapacityData.capacityUsed;
        this.randomFree = this.randomTotal - this.randomUsed;

        this.multiBarData = this.getStartingData();

        this.legend = { display: true };
        this.tooltips = { enabled: true };
        this.animation = { duration: 1000 };

        this.criticalChartTotal = 100000000000;
        this.criticalChartUsed = 90807000000;
        this.criticalChartFree = this.criticalChartTotal - this.criticalChartUsed;
    }
}
