import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Strings } from '../../../../generated/Strings';
import { DoughnutChartComponent, DoughnutChartData } from '../doughnut-chart.component';
export interface CapacityDoughnutChartData {
    /**
     * The label for the data segment
     */
    label: string;
    /**
     * The value of the data segment
     */
    value: number;
}
export declare class CapacityDoughnutChartComponent implements OnInit, OnDestroy {
    private changeDetectorRef;
    /**
     * Title shown for the chart
     */
    chartTitle: string;
    /**
     * List of data for the doughnut chart
     */
    capacityChartData: CapacityDoughnutChartData[];
    /**
     * subtext to be shown in the center of the chart
     */
    centerChartSubtext: string;
    /**
     * The total capacity of the chart
     */
    total: number;
    /**
     * True to show the info button tooltip
     */
    showTooltip: boolean;
    /**
     * Sets the yellow threshold. Default is 0.75, use yellowThreshold='disabled' to disable
     */
    yellowThreshold?: number | string;
    /**
     * Sets the red threshold. Default is 0.9, use redThreshold='disabled' to disable
     */
    redThreshold?: number | string;
    /**
     * Emits tool tip toggled event
     */
    onTooltipToggle: EventEmitter<any>;
    chart: DoughnutChartComponent;
    percentUsedText: string;
    doughnutChartData: DoughnutChartData[];
    strings: Strings;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    private getColorScheme(amountUsed);
    private updateChartData();
    /**
     * emit tool tip event
     */
    toggleTooltip(): void;
    /**
     * refresh the chart data
     */
    refresh(): void;
    ngOnDestroy(): void;
}
