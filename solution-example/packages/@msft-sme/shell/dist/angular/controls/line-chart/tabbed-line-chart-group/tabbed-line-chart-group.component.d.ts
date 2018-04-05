import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { LineChartComponent, LineChartData } from '../line-chart.component';
export declare class TabbedLineChartGroupComponent implements OnInit, OnDestroy {
    private changeDetectorRef;
    lineChartComponents: QueryList<LineChartComponent>;
    groupData: Map<string, LineChartData>[];
    tabList: string[];
    chartsPerRow: number;
    loadingWheels?: boolean;
    loadingMessage?: string;
    /**
     * Array of functions to apply to each chart in turn. Functions will modify tooltip data value for pretty printing
     */
    tooltipFormatters?: Function[];
    onTabClick: EventEmitter<number>;
    tabGroupWidth: string;
    tabGroupMargin: string;
    selectedTab: string;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    getTabGroupDimensions(): void;
    /**
     * Set selected tab and emit this event
     */
    setTab(tab: string, index: number): void;
    /**
     * Refresh all of the charts when new data is added to lineChartData input
     */
    refresh(): void;
    /**
     * Get line chart data for selected tab
     */
    getLineChartData(tabChartData: any): LineChartData;
    /**
     * Check whether the LineChartData.isLoading for that tab is set to  true or false
     */
    dataIsLoading(tabChartData: any): boolean;
    ngOnDestroy(): void;
}
