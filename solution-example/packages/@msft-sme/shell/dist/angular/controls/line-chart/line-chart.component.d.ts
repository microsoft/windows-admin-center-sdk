/// <reference types="chart.js" />
import 'chart.js';
import { DatePipe } from '@angular/common';
import { AfterViewInit, OnInit } from '@angular/core';
import { UIChart } from 'primeng/primeng';
export declare enum LineChartType {
    /**
     * Line chart takes in data as number[]
     */
    Line = 1,
    /**
     * Scatter chart takes in data as ChartPoint[] with x and y coordinates
     */
    Scatter = 2,
    /**
     * Historical chart takes in data at ChartPoint[] with x and y coordinates
     * x coordinates or historical chart are in the format of an integer timestamp
     * so that the tooltips can format the appropriate date
     */
    Historical = 3,
}
export interface LineChartData {
    title: string;
    chartData: LinearChartData;
    currentValueLabel?: string;
    firstCurrentValueLabel?: string;
    secondCurrentValueLabel?: string;
    totalCurrentValueLabel?: string;
    firstLabel?: string;
    secondLabel?: string;
    totalLabel?: string;
    yAxisMinLabel?: string;
    yAxisMaxLabel?: string;
    xAxisMaxLabel?: string;
    xAxisMinLabel?: string;
    ymaxValue?: number;
    type?: LineChartType;
    xAxisMin?: number;
    xAxisMax?: number;
    unitLabel?: string;
    isLoading?: boolean;
}
export declare class LineChartComponent implements OnInit, AfterViewInit {
    private datePipe;
    chart: UIChart;
    /**
     *  Function to apply to tooltip data for pretty-printing the value
     */
    tooltipFormatter: Function;
    lineChartData: LineChartData;
    chartOptions: ChartOptions;
    private readonly gradientStartColor;
    private readonly gradientStopColor;
    private readonly chartLineGray;
    private readonly overrideData;
    constructor(datePipe: DatePipe);
    /**
     * Angular lifecycle hook, called after the component is initialized
     */
    ngOnInit(): void;
    /**
     * Angular lifecycle hook, called after the view is initialized
     */
    ngAfterViewInit(): void;
    private override();
    /**
     * Throw error if consumer is trying to graph a scatter plot without x y coordinates
     */
    private validateChartType();
    /**
     * return the string for the type of line chart
     * @param type the type of line chart
     */
    getTypeString(type: LineChartType): string;
    /**
     * Returns tool tip label according to the type of chart being used
     * @param tooltipItem - the specific item that needs a tooltip
     * @param data - the linearchartdata object
     */
    private getTooltipLabel(tooltipItem, data);
    /**
     * Refresh the chart when new data is added to lineChartData input
     */
    refresh(): void;
}
