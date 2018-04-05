import 'chart.js';
import { EventEmitter, OnInit } from '@angular/core';
import { Strings } from '../../../generated/Strings';
import { CapacityBarChartUpdateData, CustomHorizontalBarChartData } from './custom-horizontal-bar-chart-data.interface';
/**
 * This component will create a horizontal bar chart two segments.
 *  The first segment represents the amount of total currently used, and the other repressing the free amount left out of  the total.
 *  They will completely fill the width of the chart.
 */
export declare class CapacityBarChartComponent implements OnInit {
    /**
     *  Input binding for CSS width animation time in ms. Default if omitted is no animation.
     */
    animationTime?: number;
    /**
     *  Input binding for height of bar chart in pixels
     */
    height?: number;
    /**
     *  Input binding for number representing current amount (of total)
     */
    capacityUsed: number;
    /**
     *  Input binding for number representing total amount possible
     */
    totalCapacity: number;
    /**
     *  Input binding for optional percent (as a decimal) full at which the color turns from yellow to red (default is 0.9)
     */
    warningAt?: number | string;
    /**
     *  Input binding for optional percent (as a decimal) full at which the color turns from blue to yellow (default is 0.8).
     *  Use 'disabled' to disable warning and critical colors.
     */
    criticalAt?: number | string;
    /**
     *  Input binding for optional title of chart.
     *  Use 'disabled' to disable warning and critical colors.
     */
    chartTitle?: string;
    /**
     *  Input binding for option to display total amount label.
     */
    totalLabel?: string;
    /**
     *  Input binding for option to display used amount and percent used label.
     */
    usedLabel?: string;
    /**
     *  Input binding for option to display free amount label.
     */
    freeLabel?: string;
    labelTooltip?: boolean;
    onTooltipToggle: EventEmitter<{}>;
    displayPercentCapacity: string;
    freeCapacity: number;
    usedBarColor: string;
    data: CustomHorizontalBarChartData;
    percentCapacity: number;
    totalMessage: string;
    freeMessage: string;
    usedMessage: string;
    widthTransitionStyle: string;
    heightStyle: string;
    strings: Strings;
    getColor(yellowThreshold?: string | number, redThreshold?: string | number): "#f64747" | "#fbbc05" | "#02a28c";
    prepareInputDataForUX(pData: CapacityBarChartUpdateData): void;
    update(pData: CapacityBarChartUpdateData): void;
    toggleLabelTooltip(): void;
    ngOnInit(): void;
}
