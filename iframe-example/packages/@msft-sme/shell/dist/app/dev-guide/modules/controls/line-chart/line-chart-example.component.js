import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContextService, LineChartType } from '../../../../../angular';
import { Cim, QueryCache } from '../../../../../core';
var LineChartExampleComponent = /** @class */ (function () {
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
    LineChartExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-line-chart-example',
                    template: "\n      <h4> Line Chart Control </h4>\n\n\n      <h5> Tabbed Line Chart With Assync Loading</h5>\n      <br> This uses loading wheels.  Clicking a tabl results in \"new\" data being loaded. The loading wheel reappears, and then disappears after data is \"loaded\". In this case, the left chart always loads first after 1 second and the right chart loads after 1.5 seconds.\n      <sme-tabbed-line-chart-group #linechart6 [loadingWheels]=\"true\" [loadingMessage]=\"loadingMessage\" [groupData]=\"groupData3\" [tabList]=\"tabList3\" (onTabClick)=\"mockAssyncDataLoading($event)\"></sme-tabbed-line-chart-group>\n\n\n      <h4> Line Chart Control </h4>\n\n\n      <h5> Single Line Chart </h5>\n      <p>\n        Use sme-line-chart to render a single line chart. To use it, you need to pass in a LineChartData object\n      </p>\n      <p>LineChartData</p>\n      <div style=\"padding-left: 30px\">\n        title: string; ----> This is the title that will show up above the chart\n        <br> chartData: LinearChartData; ----> This is the LinearChartData object that is actually passed to ChartJs\n        <br> currentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point. It is displayed under\n        the title\n        <br> firstCurrentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point for dataset 1 in SDDC. It is displayed under\n        the title.\n        <br> secondCurrentValueLabel?: string; ----> This is the at-a-glance value of the most recent data point for dataset 2 in SDDC (if 2 datasets). It is displayed under\n        the title\n        <br> totalCurrentValueLabel?: string; ----> This is the at-a-glance value of the sum of the most recent data point from each dataset  in SDDC (if 2 datasets). It is displayed under\n        the title\n        <br> yAxisMinLabel?: string; ----> This is the minimum label for the y-axis\n        <br> yAxisMaxLabel?: string; ----> This is the maximum label for the y-axis\n        <br> xAxisMaxLabel?: string; ----> This is the maximum label for the x-axis\n        <br> xAxisMinLabel?: string; ----> This is the minimum label for the x-axis\n        <br> ymaxValue?: number; ----> This should hold the maximum y-value for the chart. It is used to scale the size of the\n        chart. Without it, the scaling of the graph is done automatically\n        <br> type?: LineChartType; ----> The LineChartType of the graph\n      </div>\n\n      <p>LinearChartData </p>\n      <div style=\"padding-left: 30px\">\n        This is a data type native to chartjs. It takes in an array of datasets that can be used to render multiple lines on one\n        graph.\n        <br> Please view the line-chart-example source code for an example of the default values to be used for the linear chart\n        data.\n      </div>\n\n      <p>LineChartType</p>\n      <div style=\"padding-left: 30px\">\n        There are currently 3 types of line charts supported by sme-line-chart:\n        <br><br> Line: linearChartData.datasets&#91;i&#93;.data is of type number&#91;&#93;\n        <div style=\"padding-left: 30px\">\n          This is a line chart that takes in an array of numbers representing y-values.<br> The x-axis is spaced evenly based on\n          the number of tick marks you specify for thegraph when initializing the data.<br> X-axis tick marks can be added by pushing\n          '' onto the linearChartData.labels array. See example component.<br> Tooltip labels in this chart will only show the\n          y-values when the user hovers over the point. This is<br>\n        </div>\n        <br> Scatter: linearChartData.datasets&#91;i&#93;.data is of type ChartPoint&#91;&#93;\n        <div style=\"padding-left: 30px\">\n          This is a line chart that takes in an array of ChartPoint objects, which have an x and y value. Points are charted according\n          to their x and y values, as opposed to the even spacing of a Line chart type. Tooltip labels in this chart will show\n          the x value and y value as given in the data set\n        </div>\n        <br> Historical: linearChartData.datasets&#91;i&#93;.data is of type ChartPoint&#91;&#93; with &#123;x, y&#125; where x\n        is a timestamp\n        <div style=\"padding-left: 30px\">\n          This is a line chart that behaves exactly as a Scatter chart. The only difference is that it expects the x values in the\n          data set to be in the form of integer time stamps. Historical chart tooltips will parse these timestamps into readable\n          dates when the user hovers over a point.\n        </div>\n        <br> If no LineChartType is specified, sme-line-chart will select the Line type\n      </div>\n\n      <h6> Single Line Chart Examples </h6>\n\n      <p>\n        To see these examples with real time data add ?gateway=&#91;your gateway url&#93;&amp;connection=&#91;your node name&#93;\n        to url for this page. This is a single sme-line-chart. All sme-line charts take up the size of its parent div. To select\n        a fixed size, wrap the sme-line-chart object in a div with a fixed width.\n        <br> With a gateway and node connected, the following graph shows live data with custom labels and sizing with the Historical\n        chart type. Hover over a point on the graph to see the tool tip with a date.\n        <br>This chart uses a ymax value of 100.\n      </p>\n      <br>\n      <div style=\"width:250px\">\n        <sme-line-chart #linechart1 [lineChartData]=\"lineChartData1\"></sme-line-chart>\n      </div>\n\n      <p>\n        With a gateway and node connected, the following graph shows live data with custom labels and sizing with the Scatter chart\n        type. Hover over a point on the graph to see the tool tip with the corresponding x and y value.\n        <br>This chart uses a ymax value of 200, so the same data will appear shorter than the previous chart.\n      </p>\n      <br>\n      <div style=\"width:500px\">\n        <sme-line-chart #linechart2 [lineChartData]=\"lineChartData2\"></sme-line-chart>\n      </div>\n\n      <br>\n      <p>This chart has 2 series plotted and a hero value for each. The third hero value is the sum total of the 2 hero values in this case. Your own code must determine this value - it is not automatically set to the sum.</p>\n\n      <div style=\"width:500px\">\n        <sme-line-chart #linechart3 [lineChartData]=\"lineChartData4\"></sme-line-chart>\n      </div>\n\n\n      <h5> Tabbed Line Chart Group </h5>\n      <p>\n        Use sme-tabbed-line-chart-group to create a group of line charts that share a layout and tab control\n        <br> The control takes in a groupData object and a tabList object, with an optional chartsPerRow number\n      </p>\n      <p>tabList:</p>\n      <div style=\"padding-left: 30px\">\n        The tabList is a list of strings that will be used to name the tabs in your tab control The order of strings in the tabList\n        will be the order that the tabs are shown in over the group of charts For example, &#91;'Live', 'Hour', 'Day', 'Month,\n        'Year'&#93;\n      </div>\n\n      <p>groupData:</p>\n      <div style=\"padding-left: 30px\">\n        The groupData object is a Map&lt;string, LineChartData&gt;&#91;&#93;. So, a list of mappings between the tab names and data\n        to show for each tab.\n        <br> Each chart in the group gets 1 map that tells the control which set of data to show for each tab.\n        <br> The key strings in the map must match the key strings in the tabsList.\n      </div>\n\n      <p>chartsPerRow:</p>\n      <div style=\"padding-left: 30px\">\n        This is the number of charts you want in each row of the group of charts. It is used to space out the charts in the chart\n        group in a way that allows them to resive relative to the space they are given on the page The default value of this is 3.\n      </div>\n\n      <h6> Tabbed Line Chart Group Examples </h6>\n      This is a group of charts with the default number of charts per row and 5 tabs.\n      <sme-tabbed-line-chart-group #linechart3 [groupData]=\"groupData\" [tabList]=\"tabList1\"></sme-tabbed-line-chart-group>\n      <br> This is a group of charts with only 2 chartsPer row and 2 tabs.\n      <sme-tabbed-line-chart-group #linechart4 [groupData]=\"groupData\" [tabList]=\"tabList2\" [chartsPerRow]=\"2\"></sme-tabbed-line-chart-group>\n      <br> This utilizes the onTabClick event to display the tab that was clicked. It also makes use of tooltipFormatters input.\n      <sme-tabbed-line-chart-group #linechart5 [groupData]=\"groupData3\" [tooltipFormatters]=\"tooltipFormatters\" [tabList]=\"tabList3\" (onTabClick)=\"showClickedTab($event)\"></sme-tabbed-line-chart-group>\n      <p>Tab clicked: {{clickedTab}}</p>\n    "
                },] },
    ];
    /** @nocollapse */
    LineChartExampleComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    LineChartExampleComponent.propDecorators = {
        'chart1': [{ type: ViewChild, args: ['linechart1',] },],
        'chart2': [{ type: ViewChild, args: ['linechart2',] },],
        'chart3': [{ type: ViewChild, args: ['linechart3',] },],
        'chart4': [{ type: ViewChild, args: ['linechart4',] },],
    };
    return LineChartExampleComponent;
}());
export { LineChartExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFBLEVBQVcsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUVwRSxPQUFPLEVBQUUsVUFBQSxFQUFrQyxNQUFPLE1BQUEsQ0FBTztBQUN6RCxPQUFPLEVBQ0gsaUJBQWlCLEVBR2pCLGFBQWEsRUFFaEIsTUFBTSx3QkFBQSxDQUF5QjtBQUNoQyxPQUFPLEVBQUUsR0FBQSxFQUFLLFVBQUEsRUFBVyxNQUFPLHFCQUFBLENBQXNCO0FBR3REO0lBOEJJLG1DQUFvQixpQkFBb0M7UUFBeEQsaUJBNExDO1FBNUxtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBckJqRCxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQWlDLEVBQUUsQ0FBQztRQUM3QyxlQUFVLEdBQWlDLEVBQUUsQ0FBQztRQUs5QyxrQkFBYSxHQUFHLElBQUksVUFBVSxDQUFXLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFFLFVBQUEsTUFBTSxJQUFJLE9BQUEsRUFBRSxFQUFGLENBQUUsQ0FBQyxDQUFDO1FBQ3ZGLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLG1CQUFjLEdBQUcsWUFBWSxDQUFDO1FBQzlCLHNCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFaEUsU0FBSSxHQUFHLENBQUMsQ0FBQztRQU9iLElBQUksQ0FBQyxTQUFTLEdBQW9CO1lBQzlCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFO2dCQUNOO29CQUNJLEtBQUssRUFBRSxL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QW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUY2RixDQUU3RixDQUFDO0lBQ0ssd0NBQWMsR0FBMkM7UUFDaEUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7UUFDeEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7UUFDeEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7UUFDeEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7S0FDdkQsQ0FBQztJQUNGLGdDQUFDO0NBL2ZELEFBK2ZDLElBQUE7U0EvZlkseUJBQXlCIiwiZmlsZSI6ImxpbmUtY2hhcnQtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9