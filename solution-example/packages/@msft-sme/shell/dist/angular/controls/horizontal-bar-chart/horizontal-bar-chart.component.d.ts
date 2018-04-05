/// <reference types="chart.js" />
import 'chart.js';
import { AfterViewInit, OnInit } from '@angular/core';
import { UIChart } from 'primeng/primeng';
import { CustomHorizontalBarChartData } from './custom-horizontal-bar-chart-data.interface';
/**
 * This component will create a horizontal bar chart with as many segments as desired. They will completely fill the width of the chart.
 */
export declare class HorizontalBarChartComponent implements OnInit, AfterViewInit {
    /**
     * Input binding for optional chart.js legend option object - default is no legend.
     *  See http://www.chartjs.org/docs/ for a complete list of  legend, tooltips, and animation options.
     */
    legend?: ChartLegendOptions;
    /**
     * Input binding for optional chart.js tooltips option object - default is no tooltips
     */
    tooltips?: ChartTooltipOptions;
    /**
     *  Input binding for optional chart.js animation object - default to no animation
     */
    animation?: ChartAnimationOptions;
    /**
     * Input binding for data object similar to a chart.js LinearChartData object.
     * This is similar to the data object that includes one additional parameter: total  sum of all data.
     * data.total is used to generate the maximum axis size so that all bars on the chart sum up to the same absolute
     * width regardless of the total value.
     */
    data: CustomHorizontalBarChartData;
    /**
     *  Input binding for height of bar chart in pixels. Default value is 50;
     */
    height: number;
    /**
     * chart.js options object. Other than the optional legend, tooltips, and animation, these are pre-set and should not be altered.
     */
    options: ChartOptions;
    initialized: boolean;
    horizontalBarChart: UIChart;
    update(pData: number[]): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
