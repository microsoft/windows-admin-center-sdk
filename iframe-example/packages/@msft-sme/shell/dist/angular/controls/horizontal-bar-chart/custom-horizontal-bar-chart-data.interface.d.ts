/// <reference types="chart.js" />
import 'chart.js';
/**
 * Extends LinearChartData by adding a (required) total field.
 */
export interface CustomHorizontalBarChartData extends LinearChartData {
    total: number;
}
/**
 * Pass an object with these propeties into the update function of a Capacity Bar Chart.
 */
export interface CapacityBarChartUpdateData {
    totalCapacity: number;
    capacityUsed: number;
    freeLabel?: string;
    usedLabel?: string;
    totalLabel?: string;
}
