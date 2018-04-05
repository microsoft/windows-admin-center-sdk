import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    AppContextService,
    LineChartComponent,
    LineChartData,
    LineChartType,
    TabbedLineChartGroupComponent
} from '@msft-sme/shell/angular';
import { Cim, QueryCache } from '@msft-sme/shell/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'sme-ng2-controls-line-chart-example',
    template: `
      <h4> Line Chart Control </h4>


      <h5> Tabbed Line Chart With Assync Loading</h5>
      <br> This uses loading wheels.  Clicking a tabl results in "new" data being loaded. The loading wheel reappears, and then disappears after data is "loaded". In this case, the left chart always loads first after 1 second and the right chart loads after 1.5 seconds.
      <sme-tabbed-line-chart-group #linechart6 [loadingWheels]="true" [loadingMessage]="loadingMessage" [groupData]="groupData3" [tabList]="tabList3" (onTabClick)="mockAssyncDataLoading($event)"></sme-tabbed-line-chart-group>


      <h4> Line Chart Control </h4>


      <h5> Single Line Chart </h5>
      <p>
        Use sme-line-chart to render a single line chart. To use it, you need to pass in a LineChartData object
      </p>
      <p>LineChartData</p>
      <div style="padding-left: 30px">
        title: string; ----> This is the title that will show up above the chart
        <br> chartData: LinearChartData; ----> This is the LinearChartData object that is actually passed to ChartJs
        <br> currentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point. It is displayed under
        the title
        <br> firstCurrentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point for dataset 1 in SDDC. It is displayed under
        the title.
        <br> secondCurrentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point for dataset 2 in SDDC (if 2 datasets). It is displayed under
        the title
        <br> totalCurrentValueLabel?: string; ----> This is the at-a-glance value of the sum of the most recent data point from each dataset  in SDDC (if 2 datasets). It is displayed under
        the title
        <br> yAxisMinLabel?: string; ----> This is the minimum label for the y-axis
        <br> yAxisMaxLabel?: string; ----> This is the maximum label for the y-axis
        <br> xAxisMaxLabel?: string; ----> This is the maximum label for the x-axis
        <br> xAxisMinLabel?: string; ----> This is the minimum label for the x-axis
        <br> ymaxValue?: number; ----> This should hold the maximum y-value for the chart. It is used to scale the size of the
        chart. Without it, the scaling of the graph is done automatically
        <br> type?: LineChartType; ----> The LineChartType of the graph
      </div>

      <p>LinearChartData </p>
      <div style="padding-left: 30px">
        This is a data type native to chartjs. It takes in an array of datasets that can be used to render multiple lines on one
        graph.
        <br> Please view the line-chart-example source code for an example of the default values to be used for the linear chart
        data.
      </div>

      <p>LineChartType</p>
      <div style="padding-left: 30px">
        There are currently 3 types of line charts supported by sme-line-chart:
        <br><br> Line: linearChartData.datasets&#91;i&#93;.data is of type number&#91;&#93;
        <div style="padding-left: 30px">
          This is a line chart that takes in an array of numbers representing y-values.<br> The x-axis is spaced evenly based on
          the number of tick marks you specify for thegraph when initializing the data.<br> X-axis tick marks can be added by pushing
          '' onto the linearChartData.labels array. See example component.<br> Tooltip labels in this chart will only show the
          y-values when the user hovers over the point. This is<br>
        </div>
        <br> Scatter: linearChartData.datasets&#91;i&#93;.data is of type ChartPoint&#91;&#93;
        <div style="padding-left: 30px">
          This is a line chart that takes in an array of ChartPoint objects, which have an x and y value. Points are charted according
          to their x and y values, as opposed to the even spacing of a Line chart type. Tooltip labels in this chart will show
          the x value and y value as given in the data set
        </div>
        <br> Historical: linearChartData.datasets&#91;i&#93;.data is of type ChartPoint&#91;&#93; with &#123;x, y&#125; where x
        is a timestamp
        <div style="padding-left: 30px">
          This is a line chart that behaves exactly as a Scatter chart. The only difference is that it expects the x values in the
          data set to be in the form of integer time stamps. Historical chart tooltips will parse these timestamps into readable
          dates when the user hovers over a point.
        </div>
        <br> If no LineChartType is specified, sme-line-chart will select the Line type
      </div>

      <h6> Single Line Chart Examples </h6>

      <p>
        To see these examples with real time data add ?gateway=&#91;your gateway url&#93;&amp;connection=&#91;your node name&#93;
        to url for this page. This is a single sme-line-chart. All sme-line charts take up the size of its parent div. To select
        a fixed size, wrap the sme-line-chart object in a div with a fixed width.
        <br> With a gateway and node connected, the following graph shows live data with custom labels and sizing with the Historical
        chart type. Hover over a point on the graph to see the tool tip with a date.
        <br>This chart uses a ymax value of 100.
      </p>
      <br>
      <div style="width:250px">
        <sme-line-chart #linechart1 [lineChartData]="lineChartData1"></sme-line-chart>
      </div>

      <p>
        With a gateway and node connected, the following graph shows live data with custom labels and sizing with the Scatter chart
        type. Hover over a point on the graph to see the tool tip with the corresponding x and y value.
        <br>This chart uses a ymax value of 200, so the same data will appear shorter than the previous chart.
      </p>
      <br>
      <div style="width:500px">
        <sme-line-chart #linechart2 [lineChartData]="lineChartData2"></sme-line-chart>
      </div>

      <br>
      <p>This chart has 2 series plotted and a hero value for each. The third hero value is the sum total of the 2 hero values in this case. Your own code must determine this value - it is not automatically set to the sum.</p>

      <div style="width:500px">
        <sme-line-chart #linechart3 [lineChartData]="lineChartData4"></sme-line-chart>
      </div>


      <h5> Tabbed Line Chart Group </h5>
      <p>
        Use sme-tabbed-line-chart-group to create a group of line charts that share a layout and tab control
        <br> The control takes in a groupData object and a tabList object, with an optional chartsPerRow number
      </p>
      <p>tabList:</p>
      <div style="padding-left: 30px">
        The tabList is a list of strings that will be used to name the tabs in your tab control The order of strings in the tabList
        will be the order that the tabs are shown in over the group of charts For example, &#91;'Live', 'Hour', 'Day', 'Month,
        'Year'&#93;
      </div>

      <p>groupData:</p>
      <div style="padding-left: 30px">
        The groupData object is a Map&lt;string, LineChartData&gt;&#91;&#93;. So, a list of mappings between the tab names and data
        to show for each tab.
        <br> Each chart in the group gets 1 map that tells the control which set of data to show for each tab.
        <br> The key strings in the map must match the key strings in the tabsList.
      </div>

      <p>chartsPerRow:</p>
      <div style="padding-left: 30px">
        This is the number of charts you want in each row of the group of charts. It is used to space out the charts in the chart
        group in a way that allows them to resive relative to the space they are given on the page The default value of this is 3.
      </div>

      <h6> Tabbed Line Chart Group Examples </h6>
      This is a group of charts with the default number of charts per row and 5 tabs.
      <sme-tabbed-line-chart-group #linechart3 [groupData]="groupData" [tabList]="tabList1"></sme-tabbed-line-chart-group>
      <br> This is a group of charts with only 2 chartsPer row and 2 tabs.
      <sme-tabbed-line-chart-group #linechart4 [groupData]="groupData" [tabList]="tabList2" [chartsPerRow]="2"></sme-tabbed-line-chart-group>
      <br> This utilizes the onTabClick event to display the tab that was clicked. It also makes use of tooltipFormatters input.
      <sme-tabbed-line-chart-group #linechart5 [groupData]="groupData3" [tooltipFormatters]="tooltipFormatters" [tabList]="tabList3" (onTabClick)="showClickedTab($event)"></sme-tabbed-line-chart-group>
      <p>Tab clicked: {{clickedTab}}</p>
    `
})
export class LineChartExampleComponent implements AfterViewInit {
    @ViewChild('linechart1') public chart1: LineChartComponent;
    @ViewChild('linechart2') public chart2: LineChartComponent;
    @ViewChild('linechart3') public chart3: LineChartComponent;
    @ViewChild('linechart4') public chart4: LineChartComponent;
    public cpuChartSubscription: Subscription;
    public chartData: LinearChartData;
    public staticChartData: LinearChartData;
    public staticChartData2: LinearChartData;
    public tabList1: string[] = [];
    public tabList2: string[] = [];
    public tabList3: string[] = [];
    public groupData: Map<string, LineChartData>[] = [];
    public groupData3: Map<string, LineChartData>[] = [];
    public lineChartData1: LineChartData;
    public lineChartData2: LineChartData;
    public lineChartData3: LineChartData;
    public lineChartData4: LineChartData;
    public cpuQueryCache = new QueryCache<any, any>(params => this.getProcessors(), params => '');
    public initialized = false;
    public clickedTab: number;
    public loadingMessage = 'loading...';
    public tooltipFormatters = [this.dummyFormatter1, this.dummyFormatter2];

    private tick = 0;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-line-chart';
    }

    constructor(private appContextService: AppContextService) {
        this.chartData = <LinearChartData>{
            labels: [],
            datasets: [
                {
                    label: 'CPU',
                    data: [],
                    fill: true,
                    borderColor: '#0078D7',
                    lineTension: 0,
                    borderWidth: 1,
                    backgroundColor: 'rgba(172,211,241,0.4)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,120,215,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0,120,215,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 0,
                    pointHitRadius: 10
                }
            ]
        };

        this.staticChartData = <LinearChartData>{
            labels: [],
            datasets: [
                {
                    label: 'CPU',
                    data: [],
                    fill: true,
                    borderColor: '#0078D7',
                    lineTension: 0,
                    borderWidth: 1,
                    backgroundColor: 'rgba(172,211,241,0.4)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,120,215,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0,120,215,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 0,
                    pointHitRadius: 10
                }
            ]
        };

        this.staticChartData2 = <LinearChartData>{
            labels: [],
            datasets: [
                {
                    label: 'Guest CPU',
                    data: [],
                    fill: true,
                    borderColor: '#0078D7',
                    lineTension: 0,
                    borderWidth: 1,
                    backgroundColor: 'rgba(172,211,241,0.4)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,120,215,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0,120,215,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 0,
                    pointHitRadius: 10
                },
                {
                    label: 'Host CPU',
                    data: [],
                    fill: true,
                    borderColor: '#0078D7',
                    lineTension: 0,
                    borderWidth: 1,
                    backgroundColor: 'rgba(172,211,241,0.4)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,120,215,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0,120,215,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 0,
                    pointHitRadius: 10
                }
            ]
        };
        this.staticChartData.datasets[0].data = this.getStaticData();
        this.staticChartData2.datasets[0].data = this.getStaticData2();
        this.staticChartData2.datasets[1].data = this.getStaticData3();

        // add 60 labels to x axis
        for (let i = 60; i > 0; i--) {
            this.chartData.labels.push('');
            this.staticChartData.labels.push('');
            this.staticChartData2.labels.push('');
        }

        // we know xAxisMaxLabel should be 60 seconds because 60 labels and update new data every 1 second
        this.lineChartData1 = {
            chartData: this.chartData,
            currentValueLabel: '10',
            unitLabel: 'GHz',
            xAxisMaxLabel: '60 seconds ago',
            xAxisMinLabel: 'Now',
            yAxisMaxLabel: '100%',
            yAxisMinLabel: '0',
            title: 'Loading',
            ymaxValue: 100,
            type: LineChartType.Historical,
            isLoading: true
        };

        this.lineChartData2 = {
            chartData: this.chartData,
            currentValueLabel: '7',
            unitLabel: 'GB',
            xAxisMaxLabel: '60s',
            xAxisMinLabel: '0',
            yAxisMaxLabel: '100 GB',
            yAxisMinLabel: '0',
            title: 'Custom Title',
            ymaxValue: 200,
            type: LineChartType.Scatter,
            isLoading: true
        };

        this.lineChartData3 = {
            chartData: this.staticChartData,
            currentValueLabel: '40',
            unitLabel: '%',
            xAxisMaxLabel: '60 seconds ago',
            xAxisMinLabel: 'Now',
            yAxisMaxLabel: '100%',
            yAxisMinLabel: '0',
            title: 'Static Data',
            isLoading: true
        };

        this.lineChartData4 = {
            chartData: this.staticChartData2,
            firstCurrentValueLabel: '1',
            secondCurrentValueLabel: '59',
            totalCurrentValueLabel: '60',
            firstLabel: 'Host',
            secondLabel: 'Guest',
            totalLabel: 'Total',
            unitLabel: 'GB',
            xAxisMaxLabel: '60 seconds ago',
            xAxisMinLabel: 'Now',
            yAxisMinLabel: '0',
            yAxisMaxLabel: '100 GB',
            ymaxValue: 100,
            title: 'Static Data 2'
        };

        // this is the order the tabs will show up in
        this.tabList1 = ['Live', 'Hour', 'Day', 'Month', 'Year'];
        this.tabList2 = ['Live', 'Year'];
        this.tabList3 = ['Tab 0', 'Tab 1', 'Tab 2'];

        this.updateCpuChartData();
        Observable.interval(300).map(() => {
            this.updateCpuChartData();
            this.chart1.refresh();
            this.updateCpuChartData();
            this.chart2.refresh();
        }).subscribe();
        this.setTabGroupData();
    }

    public ngAfterViewInit(): void {
        this.initialized = true;
        this.mockAssyncDataLoading(0);
    }

    private updateCpuChartData() {
        if (this.appContextService.connectionManager.activeConnection) {
            this.cpuChartSubscription = this.cpuQueryCache.createObservable().subscribe(response => {
                let newData: ChartPoint[] = [];
                let cpuUtilizationData = <number[]>response.value[0].properties.utilization;
                for (let i = cpuUtilizationData.length - 1; i >= 0; i--) {
                    newData.push({ x: -i, y: MsftSme.round(cpuUtilizationData[i], 2) });
                }

                // update existing data with new data and refresh charts
                this.chartData.datasets[0].data = newData;
                this.lineChartData1.currentValueLabel = '{0} GHz'.format(MsftSme.last(newData).y);
                this.lineChartData1.title = response.value[0].properties.name;
                this.lineChartData2.currentValueLabel = '{0} %'.format(MsftSme.last(newData).y);
                if (this.initialized) {
                    this.chart1.refresh();
                    this.chart2.refresh();
                    this.chart3.refresh();
                    this.chart4.refresh();
                }
            });

            this.cpuQueryCache.fetch({ interval: 1000, params: null });
        } else {
            this.staticChartData.datasets[0].data = this.getStaticData();
            this.lineChartData1.type = LineChartType.Line;
            this.lineChartData1.chartData = this.staticChartData;
            this.lineChartData2.type = LineChartType.Line;
            this.lineChartData2.chartData = this.staticChartData;
            this.lineChartData1.title = 'Sample Data';
        }
    }

    public getProcessors(): Observable<any> {
        return this.appContextService.cim.getInstanceMultiple(
            'localhost',
            Cim.namespace.managementTools2,
            Cim.cimClass.msftMTProcessorSummary);
    }

    public getStaticData(): number[] {
        let newData: number[] = [];
        for (let i = 0; i < 100; i++) {
            newData.push(50 * (Math.sin((i - this.tick) / 4) * Math.sin((i - this.tick) / 4)) + 10 * Math.random() + i - (this.tick % 100));
        }
        this.tick++;
        return newData;
    }

    public getStaticData2(): number[] {
        let newData: number[] = [];
        for (let i = 0; i < 60; i++) {
            newData.push(60 - i);
        }
        this.tick++;
        return newData;
    }

    public getStaticData3(): number[] {
        let newData: number[] = [];
        for (let i = 0; i < 60; i++) {
            newData.push(i);
        }
        this.tick++;
        return newData;
    }

    public setTabGroupData() {
        // keys correspond to tabList. The key strings in the map must match the strings in the tabList
        // if a key in the tabList is left out in a set of group data,
        // the chart will not be rendered when that tab is selected
        let tabGroupData1 = new Map<string, LineChartData>();
        tabGroupData1.set('Live', this.lineChartData1);
        tabGroupData1.set('Hour', this.lineChartData2);
        tabGroupData1.set('Day', this.lineChartData3);
        tabGroupData1.set('Month', this.lineChartData2);
        tabGroupData1.set('Year', this.lineChartData3);

        let tabGroupData2 = new Map<string, LineChartData>();
        tabGroupData2.set('Live', this.lineChartData3);
        tabGroupData2.set('Hour', this.lineChartData1);
        tabGroupData2.set('Day', this.lineChartData2);
        tabGroupData2.set('Month', this.lineChartData3);
        tabGroupData2.set('Year', this.lineChartData1);

        this.groupData.push(tabGroupData1);
        this.groupData.push(tabGroupData2);
        this.groupData.push(tabGroupData1);
        this.groupData.push(tabGroupData2);
        this.groupData.push(tabGroupData1);
        this.groupData.push(tabGroupData2);

        let tabGroupData3 = new Map<string, LineChartData>();
        tabGroupData3.set('Tab 0', this.lineChartData1);
        tabGroupData3.set('Tab 1', this.lineChartData1);
        tabGroupData3.set('Tab 2', this.lineChartData1);

        let tabGroupData4 = new Map<string, LineChartData>();
        tabGroupData4.set('Tab 0', this.lineChartData3);
        tabGroupData4.set('Tab 1', this.lineChartData2);
        tabGroupData4.set('Tab 2', this.lineChartData2);

        this.groupData3.push(tabGroupData3);
        this.groupData3.push(tabGroupData4);

    }

    public mockAssyncDataLoading(tabIndex: number): void {
        let chartData0 = this.groupData3[0].get(`Tab {0}`.format(tabIndex));
        let chartData1 = this.groupData3[1].get(`Tab {0}`.format(tabIndex));
        chartData0.isLoading = true;
        chartData1.isLoading = true;
        // chart0 finishes "loading" first
        setTimeout(() => {
            chartData0.isLoading = false;
        },         1000);
        setTimeout(() => {
            chartData1.isLoading = false;
        },         1500);
    }

    public showClickedTab(tabPosition: number) {
        this.clickedTab = tabPosition;
    }

    public dummyFormatter1(input: number): string {
        return 'dummy formatted data value';
    }

    public dummyFormatter2(input: number): string {
        return `rounded: {0}`.format(MsftSme.round(input));
    }
}
