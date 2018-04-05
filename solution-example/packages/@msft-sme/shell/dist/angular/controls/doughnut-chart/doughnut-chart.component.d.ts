/// <reference types="chart.js" />
import 'chart.js';
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UIChart } from 'primeng/primeng';
export interface DoughnutChartData {
    /**
     * The label for the data segment
     */
    label: string;
    /**
     * The value of the data segment
     */
    value: number;
    /**
     * The color to use for the data segment
     */
    color: string;
    /**
     * True to show legend
     */
    showLegend?: boolean;
}
export declare class DoughnutChartComponent implements OnInit, OnDestroy {
    private changeDetectorRef;
    /**
     * List of data to be shown on the chart
     */
    doughnutChartData: DoughnutChartData[];
    /**
     * Title shown for the chart
     */
    chartTitle: string;
    /**
     * Text in the center of the doughnut chart
     */
    centerChartText: string;
    /**
     * Subtext in the center of the doughnut chart
     */
    centerChartSubtext: string;
    /**
     * True to display the info button tooltip
     */
    showTooltip: boolean;
    /**
     * Emits tooltip toggled event
     */
    onTooltipToggle: EventEmitter<any>;
    chart: UIChart;
    options: any;
    data: ChartData;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    updateChartData(): void;
    /**
     * refreshed the chart data
     */
    refresh(): void;
    /**
     * emits event on tool tip toggled
     */
    toggleTooltip(): void;
    ngOnDestroy(): void;
}
