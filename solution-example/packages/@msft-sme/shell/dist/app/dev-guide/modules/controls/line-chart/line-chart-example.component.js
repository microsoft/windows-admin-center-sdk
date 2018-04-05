import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LineChartType } from '../../../../../angular';
import { Cim, QueryCache } from '../../../../../core';
var LineChartExampleComponent = (function () {
    function LineChartExampleComponent(appContextService) {
        var _this = this;
        this.appContextService = appContextService;
        this.tabList1 = [];
        this.tabList2 = [];
        this.tabList3 = [];
        this.groupData = [];
        this.groupData3 = [];
        this.cpuQueryCache = new QueryCache(function (params) { return _this.getProcessors(); }, function (params) { return ''; });
        this.initialized = false;
        this.loadingMessage = 'loading...';
        this.tooltipFormatters = [this.dummyFormatter1, this.dummyFormatter2];
        this.tick = 0;
        this.chartData = {
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
        this.staticChartData = {
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
        this.staticChartData2 = {
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
        for (var i = 60; i > 0; i--) {
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
        Observable.interval(300).map(function () {
            _this.updateCpuChartData();
            _this.chart1.refresh();
            _this.updateCpuChartData();
            _this.chart2.refresh();
        }).subscribe();
        this.setTabGroupData();
    }
    LineChartExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-line-chart';
    };
    LineChartExampleComponent.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        this.mockAssyncDataLoading(0);
    };
    LineChartExampleComponent.prototype.updateCpuChartData = function () {
        var _this = this;
        if (this.appContextService.connectionManager.activeConnection) {
            this.cpuChartSubscription = this.cpuQueryCache.createObservable().subscribe(function (response) {
                var newData = [];
                var cpuUtilizationData = response.value[0].properties.utilization;
                for (var i = cpuUtilizationData.length - 1; i >= 0; i--) {
                    newData.push({ x: -i, y: MsftSme.round(cpuUtilizationData[i], 2) });
                }
                // update existing data with new data and refresh charts
                _this.chartData.datasets[0].data = newData;
                _this.lineChartData1.currentValueLabel = '{0} GHz'.format(MsftSme.last(newData).y);
                _this.lineChartData1.title = response.value[0].properties.name;
                _this.lineChartData2.currentValueLabel = '{0} %'.format(MsftSme.last(newData).y);
                if (_this.initialized) {
                    _this.chart1.refresh();
                    _this.chart2.refresh();
                    _this.chart3.refresh();
                    _this.chart4.refresh();
                }
            });
            this.cpuQueryCache.fetch({ interval: 1000, params: null });
        }
        else {
            this.staticChartData.datasets[0].data = this.getStaticData();
            this.lineChartData1.type = LineChartType.Line;
            this.lineChartData1.chartData = this.staticChartData;
            this.lineChartData2.type = LineChartType.Line;
            this.lineChartData2.chartData = this.staticChartData;
            this.lineChartData1.title = 'Sample Data';
        }
    };
    LineChartExampleComponent.prototype.getProcessors = function () {
        return this.appContextService.cim.getInstanceMultiple('localhost', Cim.namespace.managementTools2, Cim.cimClass.msftMTProcessorSummary);
    };
    LineChartExampleComponent.prototype.getStaticData = function () {
        var newData = [];
        for (var i = 0; i < 100; i++) {
            newData.push(50 * (Math.sin((i - this.tick) / 4) * Math.sin((i - this.tick) / 4)) + 10 * Math.random() + i - (this.tick % 100));
        }
        this.tick++;
        return newData;
    };
    LineChartExampleComponent.prototype.getStaticData2 = function () {
        var newData = [];
        for (var i = 0; i < 60; i++) {
            newData.push(60 - i);
        }
        this.tick++;
        return newData;
    };
    LineChartExampleComponent.prototype.getStaticData3 = function () {
        var newData = [];
        for (var i = 0; i < 60; i++) {
            newData.push(i);
        }
        this.tick++;
        return newData;
    };
    LineChartExampleComponent.prototype.setTabGroupData = function () {
        // keys correspond to tabList. The key strings in the map must match the strings in the tabList
        // if a key in the tabList is left out in a set of group data,
        // the chart will not be rendered when that tab is selected
        var tabGroupData1 = new Map();
        tabGroupData1.set('Live', this.lineChartData1);
        tabGroupData1.set('Hour', this.lineChartData2);
        tabGroupData1.set('Day', this.lineChartData3);
        tabGroupData1.set('Month', this.lineChartData2);
        tabGroupData1.set('Year', this.lineChartData3);
        var tabGroupData2 = new Map();
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
        var tabGroupData3 = new Map();
        tabGroupData3.set('Tab 0', this.lineChartData1);
        tabGroupData3.set('Tab 1', this.lineChartData1);
        tabGroupData3.set('Tab 2', this.lineChartData1);
        var tabGroupData4 = new Map();
        tabGroupData4.set('Tab 0', this.lineChartData3);
        tabGroupData4.set('Tab 1', this.lineChartData2);
        tabGroupData4.set('Tab 2', this.lineChartData2);
        this.groupData3.push(tabGroupData3);
        this.groupData3.push(tabGroupData4);
    };
    LineChartExampleComponent.prototype.mockAssyncDataLoading = function (tabIndex) {
        var chartData0 = this.groupData3[0].get("Tab {0}".format(tabIndex));
        var chartData1 = this.groupData3[1].get("Tab {0}".format(tabIndex));
        chartData0.isLoading = true;
        chartData1.isLoading = true;
        // chart0 finishes "loading" first
        setTimeout(function () {
            chartData0.isLoading = false;
        }, 1000);
        setTimeout(function () {
            chartData1.isLoading = false;
        }, 1500);
    };
    LineChartExampleComponent.prototype.showClickedTab = function (tabPosition) {
        this.clickedTab = tabPosition;
    };
    LineChartExampleComponent.prototype.dummyFormatter1 = function (input) {
        return 'dummy formatted data value';
    };
    LineChartExampleComponent.prototype.dummyFormatter2 = function (input) {
        return "rounded: {0}".format(MsftSme.round(input));
    };
    return LineChartExampleComponent;
}());
export { LineChartExampleComponent };
LineChartExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-line-chart-example',
                template: "\n      <h4> Line Chart Control </h4>\n\n\n      <h5> Tabbed Line Chart With Assync Loading</h5>\n      <br> This uses loading wheels.  Clicking a tabl results in \"new\" data being loaded. The loading wheel reappears, and then disappears after data is \"loaded\". In this case, the left chart always loads first after 1 second and the right chart loads after 1.5 seconds.\n      <sme-tabbed-line-chart-group #linechart6 [loadingWheels]=\"true\" [loadingMessage]=\"loadingMessage\" [groupData]=\"groupData3\" [tabList]=\"tabList3\" (onTabClick)=\"mockAssyncDataLoading($event)\"></sme-tabbed-line-chart-group>\n\n\n      <h4> Line Chart Control </h4>\n\n\n      <h5> Single Line Chart </h5>\n      <p>\n        Use sme-line-chart to render a single line chart. To use it, you need to pass in a LineChartData object\n      </p>\n      <p>LineChartData</p>\n      <div style=\"padding-left: 30px\">\n        title: string; ----> This is the title that will show up above the chart\n        <br> chartData: LinearChartData; ----> This is the LinearChartData object that is actually passed to ChartJs\n        <br> currentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point. It is displayed under\n        the title\n        <br> firstCurrentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point for dataset 1 in SDDC. It is displayed under\n        the title.\n        <br> secondCurrentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point for dataset 2 in SDDC (if 2 datasets). It is displayed under\n        the title\n        <br> totalCurrentValueLabel?: string; ----> This is the at-a-glance value of the sum of the most recent data point from each dataset  in SDDC (if 2 datasets). It is displayed under\n        the title\n        <br> yAxisMinLabel?: string; ----> This is the minimum label for the y-axis\n        <br> yAxisMaxLabel?: string; ----> This is the maximum label for the y-axis\n        <br> xAxisMaxLabel?: string; ----> This is the maximum label for the x-axis\n        <br> xAxisMinLabel?: string; ----> This is the minimum label for the x-axis\n        <br> ymaxValue?: number; ----> This should hold the maximum y-value for the chart. It is used to scale the size of the\n        chart. Without it, the scaling of the graph is done automatically\n        <br> type?: LineChartType; ----> The LineChartType of the graph\n      </div>\n\n      <p>LinearChartData </p>\n      <div style=\"padding-left: 30px\">\n        This is a data type native to chartjs. It takes in an array of datasets that can be used to render multiple lines on one\n        graph.\n        <br> Please view the line-chart-example source code for an example of the default values to be used for the linear chart\n        data.\n      </div>\n\n      <p>LineChartType</p>\n      <div style=\"padding-left: 30px\">\n        There are currently 3 types of line charts supported by sme-line-chart:\n        <br><br> Line: linearChartData.datasets&#91;i&#93;.data is of type number&#91;&#93;\n        <div style=\"padding-left: 30px\">\n          This is a line chart that takes in an array of numbers representing y-values.<br> The x-axis is spaced evenly based on\n          the number of tick marks you specify for thegraph when initializing the data.<br> X-axis tick marks can be added by pushing\n          '' onto the linearChartData.labels array. See example component.<br> Tooltip labels in this chart will only show the\n          y-values when the user hovers over the point. This is<br>\n        </div>\n        <br> Scatter: linearChartData.datasets&#91;i&#93;.data is of type ChartPoint&#91;&#93;\n        <div style=\"padding-left: 30px\">\n          This is a line chart that takes in an array of ChartPoint objects, which have an x and y value. Points are charted according\n          to their x and y values, as opposed to the even spacing of a Line chart type. Tooltip labels in this chart will show\n          the x value and y value as given in the data set\n        </div>\n        <br> Historical: linearChartData.datasets&#91;i&#93;.data is of type ChartPoint&#91;&#93; with &#123;x, y&#125; where x\n        is a timestamp\n        <div style=\"padding-left: 30px\">\n          This is a line chart that behaves exactly as a Scatter chart. The only difference is that it expects the x values in the\n          data set to be in the form of integer time stamps. Historical chart tooltips will parse these timestamps into readable\n          dates when the user hovers over a point.\n        </div>\n        <br> If no LineChartType is specified, sme-line-chart will select the Line type\n      </div>\n\n      <h6> Single Line Chart Examples </h6>\n\n      <p>\n        To see these examples with real time data add ?gateway=&#91;your gateway url&#93;&amp;connection=&#91;your node name&#93;\n        to url for this page. This is a single sme-line-chart. All sme-line charts take up the size of its parent div. To select\n        a fixed size, wrap the sme-line-chart object in a div with a fixed width.\n        <br> With a gateway and node connected, the following graph shows live data with custom labels and sizing with the Historical\n        chart type. Hover over a point on the graph to see the tool tip with a date.\n        <br>This chart uses a ymax value of 100.\n      </p>\n      <br>\n      <div style=\"width:250px\">\n        <sme-line-chart #linechart1 [lineChartData]=\"lineChartData1\"></sme-line-chart>\n      </div>\n\n      <p>\n        With a gateway and node connected, the following graph shows live data with custom labels and sizing with the Scatter chart\n        type. Hover over a point on the graph to see the tool tip with the corresponding x and y value.\n        <br>This chart uses a ymax value of 200, so the same data will appear shorter than the previous chart.\n      </p>\n      <br>\n      <div style=\"width:500px\">\n        <sme-line-chart #linechart2 [lineChartData]=\"lineChartData2\"></sme-line-chart>\n      </div>\n\n      <br>\n      <p>This chart has 2 series plotted and a hero value for each. The third hero value is the sum total of the 2 hero values in this case. Your own code must determine this value - it is not automatically set to the sum.</p>\n\n      <div style=\"width:500px\">\n        <sme-line-chart #linechart3 [lineChartData]=\"lineChartData4\"></sme-line-chart>\n      </div>\n\n\n      <h5> Tabbed Line Chart Group </h5>\n      <p>\n        Use sme-tabbed-line-chart-group to create a group of line charts that share a layout and tab control\n        <br> The control takes in a groupData object and a tabList object, with an optional chartsPerRow number\n      </p>\n      <p>tabList:</p>\n      <div style=\"padding-left: 30px\">\n        The tabList is a list of strings that will be used to name the tabs in your tab control The order of strings in the tabList\n        will be the order that the tabs are shown in over the group of charts For example, &#91;'Live', 'Hour', 'Day', 'Month,\n        'Year'&#93;\n      </div>\n\n      <p>groupData:</p>\n      <div style=\"padding-left: 30px\">\n        The groupData object is a Map&lt;string, LineChartData&gt;&#91;&#93;. So, a list of mappings between the tab names and data\n        to show for each tab.\n        <br> Each chart in the group gets 1 map that tells the control which set of data to show for each tab.\n        <br> The key strings in the map must match the key strings in the tabsList.\n      </div>\n\n      <p>chartsPerRow:</p>\n      <div style=\"padding-left: 30px\">\n        This is the number of charts you want in each row of the group of charts. It is used to space out the charts in the chart\n        group in a way that allows them to resive relative to the space they are given on the page The default value of this is 3.\n      </div>\n\n      <h6> Tabbed Line Chart Group Examples </h6>\n      This is a group of charts with the default number of charts per row and 5 tabs.\n      <sme-tabbed-line-chart-group #linechart3 [groupData]=\"groupData\" [tabList]=\"tabList1\"></sme-tabbed-line-chart-group>\n      <br> This is a group of charts with only 2 chartsPer row and 2 tabs.\n      <sme-tabbed-line-chart-group #linechart4 [groupData]=\"groupData\" [tabList]=\"tabList2\" [chartsPerRow]=\"2\"></sme-tabbed-line-chart-group>\n      <br> This utilizes the onTabClick event to display the tab that was clicked. It also makes use of tooltipFormatters input.\n      <sme-tabbed-line-chart-group #linechart5 [groupData]=\"groupData3\" [tooltipFormatters]=\"tooltipFormatters\" [tabList]=\"tabList3\" (onTabClick)=\"showClickedTab($event)\"></sme-tabbed-line-chart-group>\n      <p>Tab clicked: {{clickedTab}}</p>\n    "
            },] },
];
/** @nocollapse */
LineChartExampleComponent.ctorParameters = function () { return [
    null,
]; };
LineChartExampleComponent.propDecorators = {
    'chart1': [{ type: ViewChild, args: ['linechart1',] },],
    'chart2': [{ type: ViewChild, args: ['linechart2',] },],
    'chart3': [{ type: ViewChild, args: ['linechart3',] },],
    'chart4': [{ type: ViewChild, args: ['linechart4',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFBLEVBQVcsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUVwRSxPQUFPLEVBQUUsVUFBQSxFQUFrQyxNQUFPLE1BQUEsQ0FBTztBQUN6RCxPQUFPLEVBSUgsYUFBYSxFQUVoQixNQUFNLHdCQUFBLENBQXlCO0FBQ2hDLE9BQU8sRUFBRSxHQUFBLEVBQUssVUFBQSxFQUFXLE1BQU8scUJBQUEsQ0FBc0I7QUFHdEQ7SUE4QkksbUNBQW9CLGlCQUFvQztRQUF4RCxpQkE0TEM7UUE1TG1CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFyQmpELGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGNBQVMsR0FBaUMsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBaUMsRUFBRSxDQUFDO1FBSzlDLGtCQUFhLEdBQUcsSUFBSSxVQUFVLENBQVcsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsVUFBQSxNQUFNLElBQUksT0FBQSxFQUFFLEVBQUYsQ0FBRSxDQUFDLENBQUM7UUFDdkYsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsbUJBQWMsR0FBRyxZQUFZLENBQUM7UUFDOUIsc0JBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVoRSxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBT2IsSUFBSSxDQUFDLFNBQVMsR0FBb0I7WUFDOUIsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUU7Z0JBQ047b0JBQ0ksS0FBSyxFQUFFLEtBQUs7b0JBQ1osSUFBSSxFQUFFLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLElBQUk7b0JBQ1YsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLFdBQVcsRUFBRSxDQUFDO29CQUNkLFdBQVcsRUFBRSxDQUFDO29CQUNkLGVBQWUsRUFBRSx1QkFBdUI7b0JBQ3hDLGNBQWMsRUFBRSxNQUFNO29CQUN0QixVQUFVLEVBQUUsRUFBRTtvQkFDZCxnQkFBZ0IsRUFBRSxHQUFHO29CQUNyQixlQUFlLEVBQUUsT0FBTztvQkFDeEIsZ0JBQWdCLEVBQUUsbUJBQW1CO29CQUNyQyxvQkFBb0IsRUFBRSxNQUFNO29CQUM1QixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQix5QkFBeUIsRUFBRSxtQkFBbUI7b0JBQzlDLHFCQUFxQixFQUFFLHFCQUFxQjtvQkFDNUMscUJBQXFCLEVBQUUsQ0FBQztvQkFDeEIsV0FBVyxFQUFFLENBQUM7b0JBQ2QsY0FBYyxFQUFFLEVBQUU7aUJBQ3JCO2FBQ0o7U0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsR0FBb0I7WUFDcEMsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUU7Z0JBQ047b0JBQ0ksS0FBSyxFQUFFLEtBQUs7b0JBQ1osSUFBSSxFQUFFLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLElBQUk7b0JBQ1YsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLFdBQVcsRUFBRSxDQUFDO29CQUNkLFdBQVcsRUFBRSxDQUFDO29CQUNkLGVBQWUsRUFBRSx1QkFBdUI7b0JBQ3hDLGNBQWMsRUFBRSxNQUFNO29CQUN0QixVQUFVLEVBQUUsRUFBRTtvQkFDZCxnQkFBZ0IsRUFBRSxHQUFHO29CQUNyQixlQUFlLEVBQUUsT0FBTztvQkFDeEIsZ0JBQWdCLEVBQUUsbUJBQW1CO29CQUNyQyxvQkFBb0IsRUFBRSxNQUFNO29CQUM1QixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQix5QkFBeUIsRUFBRSxtQkFBbUI7b0JBQzlDLHFCQUFxQixFQUFFLHFCQUFxQjtvQkFDNUMscUJBQXFCLEVBQUUsQ0FBQztvQkFDeEIsV0FBVyxFQUFFLENBQUM7b0JBQ2QsY0FBYyxFQUFFLEVBQUU7aUJBQ3JCO2FBQ0o7U0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFvQjtZQUNyQyxNQUFNLEVBQUUsRUFBRTtZQUNWLFFBQVEsRUFBRTtnQkFDTjtvQkFDSSxLQUFLLEVBQUUsV0FBVztvQkFDbEIsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLElBQUk7b0JBQ1YsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLFdBQVcsRUFBRSxDQUFDO29CQUNkLFdBQVcsRUFBRSxDQUFDO29CQUNkLGVBQWUsRUFBRSx1QkFBdUI7b0JBQ3hDLGNBQWMsRUFBRSxNQUFNO29CQUN0QixVQUFVLEVBQUUsRUFBRTtvQkFDZCxnQkFBZ0IsRUFBRSxHQUFHO29CQUNyQixlQUFlLEVBQUUsT0FBTztvQkFDeEIsZ0JBQWdCLEVBQUUsbUJBQW1CO29CQUNyQyxvQkFBb0IsRUFBRSxNQUFNO29CQUM1QixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0IsRUFBRSxDQUFDO29CQUNuQix5QkFBeUIsRUFBRSxtQkFBbUI7b0JBQzlDLHFCQUFxQixFQUFFLHFCQUFxQjtvQkFDNUMscUJBQXFCLEVBQUUsQ0FBQztvQkFDeEIsV0FBVyxFQUFFLENBQUM7b0JBQ2QsY0FBYyxFQUFFLEVBQUU7aUJBQ3JCO2dCQUNEO29CQUNJLEtBQUssRUFBRSxVQUFVO29CQUNqQixJQUFJLEVBQUUsRUFBRTtvQkFDUixJQUFJLEVBQUUsSUFBSTtvQkFDVixXQUFXLEVBQUUsU0FBUztvQkFDdEIsV0FBVyxFQUFFLENBQUM7b0JBQ2QsV0FBVyxFQUFFLENBQUM7b0JBQ2QsZUFBZSxFQUFFLHVCQUF1QjtvQkFDeEMsY0FBYyxFQUFFLE1BQU07b0JBQ3RCLFVBQVUsRUFBRSxFQUFFO29CQUNkLGdCQUFnQixFQUFFLEdBQUc7b0JBQ3JCLGVBQWUsRUFBRSxPQUFPO29CQUN4QixnQkFBZ0IsRUFBRSxtQkFBbUI7b0JBQ3JDLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGdCQUFnQixFQUFFLENBQUM7b0JBQ25CLGdCQUFnQixFQUFFLENBQUM7b0JBQ25CLHlCQUF5QixFQUFFLG1CQUFtQjtvQkFDOUMscUJBQXFCLEVBQUUscUJBQXFCO29CQUM1QyxxQkFBcUIsRUFBRSxDQUFDO29CQUN4QixXQUFXLEVBQUUsQ0FBQztvQkFDZCxjQUFjLEVBQUUsRUFBRTtpQkFDckI7YUFDSjtTQUNKLENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFL0QsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsa0dBQWtHO1FBQ2xHLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsYUFBYSxFQUFFLGdCQUFnQjtZQUMvQixhQUFhLEVBQUUsS0FBSztZQUNwQixhQUFhLEVBQUUsTUFBTTtZQUNyQixhQUFhLEVBQUUsR0FBRztZQUNsQixLQUFLLEVBQUUsU0FBUztZQUNoQixTQUFTLEVBQUUsR0FBRztZQUNkLElBQUksRUFBRSxhQUFhLENBQUMsVUFBVTtZQUM5QixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsaUJBQWlCLEVBQUUsR0FBRztZQUN0QixTQUFTLEVBQUUsSUFBSTtZQUNmLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPO1lBQzNCLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMvQixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsYUFBYSxFQUFFLGdCQUFnQjtZQUMvQixhQUFhLEVBQUUsS0FBSztZQUNwQixhQUFhLEVBQUUsTUFBTTtZQUNyQixhQUFhLEVBQUUsR0FBRztZQUNsQixLQUFLLEVBQUUsYUFBYTtZQUNwQixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUNoQyxzQkFBc0IsRUFBRSxHQUFHO1lBQzNCLHVCQUF1QixFQUFFLElBQUk7WUFDN0Isc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixVQUFVLEVBQUUsTUFBTTtZQUNsQixXQUFXLEVBQUUsT0FBTztZQUNwQixVQUFVLEVBQUUsT0FBTztZQUNuQixTQUFTLEVBQUUsSUFBSTtZQUNmLGFBQWEsRUFBRSxnQkFBZ0I7WUFDL0IsYUFBYSxFQUFFLEtBQUs7WUFDcEIsYUFBYSxFQUFFLEdBQUc7WUFDbEIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsU0FBUyxFQUFFLEdBQUc7WUFDZCxLQUFLLEVBQUUsZUFBZTtTQUN6QixDQUFDO1FBRUYsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN6QixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQWhNYSx5Q0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQWdNTSxtREFBZSxHQUF0QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8sc0RBQWtCLEdBQTFCO1FBQUEsaUJBK0JDO1FBOUJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFRO2dCQUNoRixJQUFJLE9BQU8sR0FBaUIsRUFBRSxDQUFDO2dCQUMvQixJQUFJLGtCQUFrQixHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztnQkFDNUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDO2dCQUVELHdEQUF3RDtnQkFDeEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDMUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDOUQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlEQUFhLEdBQXBCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQ2pELFdBQVcsRUFDWCxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUM5QixHQUFHLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLGlEQUFhLEdBQXBCO1FBQ0ksSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BJLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSxrREFBYyxHQUFyQjtRQUNJLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSxrREFBYyxHQUFyQjtRQUNJLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLG1EQUFlLEdBQXRCO1FBQ0ksK0ZBQStGO1FBQy9GLDhEQUE4RDtRQUM5RCwyREFBMkQ7UUFDM0QsSUFBSSxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFDckQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUvQyxJQUFJLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUNyRCxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0MsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRW5DLElBQUksYUFBYSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBQ3JELGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhELElBQUksYUFBYSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBQ3JELGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXhDLENBQUM7SUFFTSx5REFBcUIsR0FBNUIsVUFBNkIsUUFBZ0I7UUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwRSxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUM1QixVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUM1QixrQ0FBa0M7UUFDbEMsVUFBVSxDQUFDO1lBQ1AsVUFBVSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQyxFQUFVLElBQUksQ0FBQyxDQUFDO1FBQ2pCLFVBQVUsQ0FBQztZQUNQLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUMsRUFBVSxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU0sa0RBQWMsR0FBckIsVUFBc0IsV0FBbUI7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7SUFDbEMsQ0FBQztJQUVNLG1EQUFlLEdBQXRCLFVBQXVCLEtBQWE7UUFDaEMsTUFBTSxDQUFDLDRCQUE0QixDQUFDO0lBQ3hDLENBQUM7SUFFTSxtREFBZSxHQUF0QixVQUF1QixLQUFhO1FBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBMkpMLGdDQUFDO0FBQUQsQ0EvZkEsQUErZkM7O0FBMUpNLG9DQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLHFDQUFxQztnQkFDL0MsUUFBUSxFQUFFLHdsUkEwSVQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsd0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7Q0FDSCxFQUY2RixDQUU3RixDQUFDO0FBQ0ssd0NBQWMsR0FBMkM7SUFDaEUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7SUFDeEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7SUFDeEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7SUFDeEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7Q0FDdkQsQ0FBQyIsImZpbGUiOiJsaW5lLWNoYXJ0LWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==