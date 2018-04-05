/// <reference types="chart.js" />
import { OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, ByteUnitConverterPipe, CapacityBarChartUpdateData, CustomHorizontalBarChartData } from '@msft-sme/shell/angular';
export declare class HorizontalBarChartExampleComponent implements OnInit {
    multiBarData: CustomHorizontalBarChartData;
    randomData: CustomHorizontalBarChartData;
    randomTotal: number;
    randomUsed: number;
    randomFree: number;
    criticalChartTotal: number;
    criticalChartUsed: number;
    criticalChartFree: number;
    legend: ChartLegendOptions;
    tooltips: ChartTooltipOptions;
    animation: ChartAnimationOptions;
    showCapacityLabelTooltip: boolean;
    private chart1;
    private chart2QueryList;
    byteUnitConverter: ByteUnitConverterPipe;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    /**
     * Gets random data to demonstrate chart refreshing
     */
    getRandomDataForHorizontalBarChart(): number[];
    getRandomDataForCapacityChart(): CapacityBarChartUpdateData;
    redrawCharts(): void;
    getStartingData(): CustomHorizontalBarChartData;
    ngOnInit(): void;
}
