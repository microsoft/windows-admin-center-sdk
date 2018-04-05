import { AfterViewInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, CapacityDoughnutChartComponent, CapacityDoughnutChartData, DoughnutChartData } from '@msft-sme/shell/angular';
export declare class DoughnutChartExampleComponent implements AfterViewInit {
    chart1: CapacityDoughnutChartComponent;
    chart2: CapacityDoughnutChartComponent;
    chart3: CapacityDoughnutChartComponent;
    doughnutChartData: DoughnutChartData[];
    capacityChartData: CapacityDoughnutChartData[];
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor();
    ngAfterViewInit(): void;
}
