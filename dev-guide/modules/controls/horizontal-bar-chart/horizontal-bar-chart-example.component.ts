import { Component, OnInit } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { HorizontalBar } from '@msft-sme/angular';
import { LegendEntryData } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-horizontal-bar-chart',
    templateUrl: './horizontal-bar-chart-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Horizontal Bar Chart Component'
})
export class HorizontalBarChartExampleComponent implements OnInit {

    public bars: HorizontalBar[] = [];
    public bars2: HorizontalBar[] = [];
    public bars3: HorizontalBar[] = [];

    public capacityStackedBarChartTotal = 100;
    public capacityStackedBarChartTotal3 = 100;

    public normalColorScheme = ['blue', 'teal'];
    public warningColorScheme = ['rgba(255, 160, 0, 1)', 'rgba(255, 160, 0, 0.5)'];
    public criticalColorScheme = ['magenta', 'pink'];

    public legendData: LegendEntryData[];
    public legendData3: LegendEntryData[];
    public legendTotalData: LegendEntryData[];

    public getRandomDataForStackedCapacityChart(): void {
        const firstBarWidth = Math.ceil(Math.random() * 5);
        const secondBarWidth = Math.ceil(Math.random() * 10);
        const thirdBarWidth = Math.ceil(Math.random() * 15);
        const fourthBarWidth = Math.ceil(Math.random() * 20);
        const fifthBarWidth = Math.ceil(Math.random() * 25);
        const sixthBarWidth = Math.ceil(Math.random() * 30);

        const capacityBarWidth1 = Math.ceil(Math.random() * 20) + 30;
        const capacityBarWidth2 = Math.ceil(Math.random() * 20) + 30;

        this.bars = [
            {
                color: 'red',
                value: firstBarWidth
            },
            {
                color: 'blue',
                value: secondBarWidth
            },
            {
                color: 'green',
                value: thirdBarWidth
            },
            {
                color: 'red',
                stripeAlpha: 50,
                value: fourthBarWidth,
                right: true
            },
            {
                color: 'blue',
                stripeAlpha: 50,
                value: fifthBarWidth,
                right: true
            },
            {
                color: 'base',
                stripeAlpha: 50,
                value: sixthBarWidth,
                right: true
            }
        ];

        this.bars2 = [
            //  no colors here so it will get the color based on red/yellow threshold and percentage of total
            {
                value: capacityBarWidth1
            },
            {
                value: capacityBarWidth2
            }
        ];
    }

    public redrawCharts(): void {
        this.getRandomDataForStackedCapacityChart();
        this.legendData = this.getBarChartLegendData(this.bars2);
        this.legendTotalData = this.getBarChartTotalLegendData(this.capacityStackedBarChartTotal);

        this.bars3 = this.bars2;
        this.legendData3 = this.legendData;
        this.capacityStackedBarChartTotal3 = this.capacityStackedBarChartTotal;
    }

    public changeChartTotal(): void {
        this.capacityStackedBarChartTotal3 = 50;
        const capacityBarWidth1 = Math.ceil(Math.random() * 15) + 10;
        const capacityBarWidth2 = Math.ceil(Math.random() * 15) + 10;

        this.bars3 = [
            //  no colors here so it will get the color based on red/yellow threshold and percentage of total
            {
                value: capacityBarWidth1
            },
            {
                value: capacityBarWidth2
            }
        ];

        this.legendData3 = this.getChartTotalLegendData(this.bars3);
    }

    public ngOnInit() {
        this.redrawCharts();
    }

    private getBarChartLegendData(bars2: HorizontalBar[]): LegendEntryData[] {
        return [
            {
                displayValue: bars2[0].value,
                label: 'Dataset 1'
            },
            {
                displayValue: bars2[1].value,
                label: 'Dataset 2',
                tooltipContext: {
                    text: 'This link will go to www.bing.com',
                    linkText: 'Microsoft Bing',
                    linkUrl: 'http://www.bing.com'
                }
            },
            {
                displayValue: this.capacityStackedBarChartTotal - bars2[0].value - bars2[1].value,
                color: '#ddd', // explicitly set so as not to be part of the color scheme
                label: 'Available'
            }
        ];
    }

    private getChartTotalLegendData(bars3: HorizontalBar[]): LegendEntryData[] {
        return [
            {
                displayValue: bars3[0].value,
                label: 'Dataset 1'
            },
            {
                displayValue: bars3[1].value,
                label: 'Dataset 2',
                tooltipContext: {
                    text: 'This link will go to www.bing.com',
                    linkText: 'Microsoft Bing',
                    linkUrl: 'http://www.bing.com'
                }
            },
            {
                displayValue: this.capacityStackedBarChartTotal3 - bars3[0].value - bars3[1].value,
                color: '#ddd', // explicitly set so as not to be part of the color scheme
                label: 'Available'
            }
        ];
    }

    private getBarChartTotalLegendData(capacityStackedBarChartTotal: number): LegendEntryData[] {
        return [
            {
                displayValue: capacityStackedBarChartTotal,
                label: 'Total',
                tooltipContext: {
                    text: 'This is a tooltip with just text and no link'
                },
                rightAlign: true,
                noColor: true
            }
        ];
    }
}
