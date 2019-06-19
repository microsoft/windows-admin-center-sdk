import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
    CapacityDoughnutChartComponent, CapacityDoughnutChartData, LegendEntryData
} from '@msft-sme/angular';
import { DoughnutChartData } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-doughnut-chart',
    templateUrl: './doughnut-chart-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Doughnut Chart Component'
})
export class DoughnutChartExampleComponent implements AfterViewInit {
    @ViewChild('capacityChart1') public chart1: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart2') public chart2: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart3') public chart3: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart4') public chart4: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart5') public chart5: CapacityDoughnutChartComponent;
    @ViewChild('capacityChart6') public chart6: CapacityDoughnutChartComponent;
    public doughnutChartData: DoughnutChartData[] = [];
    public capacityChartData: CapacityDoughnutChartData[] = [];
    public customLegendData: LegendEntryData[] =  [];

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

        this.setCustomLegendData();
    }


    private setCustomLegendData(): void {
        this.customLegendData = [
            {
                displayValue: this.capacityChartData[0].value,
                label: 'VM',
                action: () => console.log('clicked vm')
            },
            {
                displayValue: this.capacityChartData[1].value,
                label: 'Non-VM',
                action: () => console.log('clicked non-vm')
            },
            {
                color: '#123456',
                displayValue: this.capacityChartData[0].value + this.capacityChartData[1].value,
                label: 'VM + Non-VM',
                action: () => console.log('clicked vm + non-vm')
            }
        ];
    }

    public ngAfterViewInit(): void {
        // show yellow threshold
        setTimeout(() => {
            this.capacityChartData[0].value = 72;
            this.setCustomLegendData();
            this.chart1.refresh();
            this.chart2.refresh();
            this.chart3.refresh();
            this.chart4.refresh();
            this.chart5.refresh();
            this.chart6.refresh();
        },         5000);

        // show green threshold
        setTimeout(() => {
            this.capacityChartData[0].value = 53;
            this.setCustomLegendData();
            this.chart1.refresh();
            this.chart2.refresh();
            this.chart3.refresh();
            this.chart4.refresh();
            this.chart5.refresh();
            this.chart6.refresh();
        },         10000);
    }
}
