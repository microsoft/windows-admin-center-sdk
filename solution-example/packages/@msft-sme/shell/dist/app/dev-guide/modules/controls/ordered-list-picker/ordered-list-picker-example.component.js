import { Component } from '@angular/core';
var OrderedListPickerExampleComponent = (function () {
    function OrderedListPickerExampleComponent() {
        this.counter = 65;
        this.equals = function (a, b) { return a.name === b.name; };
        var myObject1 = {
            name: 'Jason'
        };
        var myObject2 = {
            name: 'Joey'
        };
        this.complexPickerDisabled = false;
        this.complexSelectedOptions = [myObject1, myObject2];
        this.complexAllOptions = [
            myObject1,
            myObject2,
            {
                name: 'Holly'
            },
            {
                name: 'Jerry'
            }, {
                name: 'Zack'
            },
            {
                name: 'Linda'
            }
        ];
        var myPrimitive1 = 'Jason';
        var myPrimitive2 = 'Joey';
        this.primitivePickerDisabled = false;
        this.primitiveSelectedOptions = [myPrimitive1, myPrimitive2];
        this.primitiveAllOptions = [
            myPrimitive1,
            myPrimitive2,
            'Kathy',
            'Linda',
            'Billy'
        ];
        this.largeOptionsSelection = [];
        this.largeOptions = [];
        for (var i = 0; i < 100; i++) {
            this.largeOptions.push(i.toString());
        }
    }
    OrderedListPickerExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-ordered-list-picker';
    };
    OrderedListPickerExampleComponent.prototype.addToComplexNgModel = function () {
        var str = String.fromCharCode(this.counter++);
        var obj = {
            name: str
        };
        this.complexSelectedOptions.push(obj);
        this.complexAllOptions.push(obj);
    };
    OrderedListPickerExampleComponent.prototype.addToPrimitiveNgModel = function () {
        var str = String.fromCharCode(this.counter++);
        this.primitiveSelectedOptions.push(str);
        this.primitiveAllOptions.push(str);
    };
    OrderedListPickerExampleComponent.prototype.addToComplexAllOptions = function () {
        var str = String.fromCharCode(this.counter++);
        this.complexAllOptions.push({
            name: str
        });
    };
    OrderedListPickerExampleComponent.prototype.addToPrimitiveAllOptions = function () {
        var str = String.fromCharCode(this.counter++);
        this.primitiveAllOptions.push(str);
    };
    OrderedListPickerExampleComponent.prototype.onComplexValueChanged = function (event) {
        console.log(event);
    };
    OrderedListPickerExampleComponent.prototype.removeFromComplexNgModel = function () {
        var target = this.complexSelectedOptions[this.complexSelectedOptions.length - 1];
        MsftSme.remove(this.complexSelectedOptions, target);
    };
    OrderedListPickerExampleComponent.prototype.removeFromPrimitiveNgModel = function () {
        var target = this.primitiveSelectedOptions[this.primitiveSelectedOptions.length - 1];
        MsftSme.remove(this.primitiveSelectedOptions, target);
    };
    OrderedListPickerExampleComponent.prototype.removeFromComplexAllOptions = function () {
        var target = this.complexAllOptions[this.complexAllOptions.length - 1];
        MsftSme.remove(this.complexAllOptions, target);
        MsftSme.remove(this.complexSelectedOptions, target);
    };
    OrderedListPickerExampleComponent.prototype.removeFromPrimitiveAllOptions = function () {
        var target = this.primitiveAllOptions[this.primitiveAllOptions.length - 1];
        MsftSme.remove(this.primitiveAllOptions, target);
        MsftSme.remove(this.primitiveSelectedOptions, target);
    };
    OrderedListPickerExampleComponent.prototype.toggleComplexDisabled = function () {
        this.complexPickerDisabled = !this.complexPickerDisabled;
    };
    OrderedListPickerExampleComponent.prototype.togglePrimitiveDisabled = function () {
        this.primitivePickerDisabled = !this.primitivePickerDisabled;
    };
    return OrderedListPickerExampleComponent;
}());
export { OrderedListPickerExampleComponent };
OrderedListPickerExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-ordered-list-picker-example',
                template: "\n      <section>\n        <h2>Ordered List Picker Component</h2>\n        <p>\n          The ordered list picker is a complex component that requires multiple inputs. The component supports using <b>primitive</b>    types such as:\n        </p>\n\n        <ul>\n          <li>strings</li>\n          <li>numbers</li>\n        </ul>\n\n        <p>\n          Additionally, the component supports the use of your own complex objects. The only requirement in the simplest case is to\n          have a list of all possible elements between the two boxes (named <code>options</code>). The component will compute\n          the contents of the left <code>&lt;select&gt;</code> by diffing the options passed in against the current value of the\n          component. The current value of the component is represented by the contents of the right <code>&lt;select&gt;</code>    initialized/accessed via the <code>ngModel</code> attribute as shown in the examples below.\n        </p>\n\n        <p>\n          Another feature of the component is built in filtering for the left <code>&lt;select&gt;</code> element. By default,\n          if there are over <b>20</b> items in the <code>options</code> array, the filter bar will appear. This behavior can be\n          overriden by using the <code>filter</code> component input. If this is set to <code>false</code>, the filter bar will\n          never show. If the value is set to <code>true</code>, the filter bar will always show.\n        </p>\n\n        <p>The component also supports double-clicking to transfer items between the boxes.</p>\n\n        <h3>\n          Component Inputs\n        </h3>\n\n        <table>\n          <thead>\n            <th>Parameter Name</th>\n            <th>Type</th>\n            <th>Description</th>\n            <th>Required</th>\n          </thead>\n          <tbody>\n            <tr>\n              <td>disabled</td>\n              <td>Boolean</td>\n              <td>Whether or not the control is disabled.</td>\n              <td>False</td>\n            </tr>\n\n            <tr>\n              <td>displayFieldName</td>\n              <td>String</td>\n              <td>The name of the attribute/field of a complex object to use as the display name of an option.</td>\n              <td>False</td>\n            </tr>\n\n            <tr>\n              <td>equalsFunction</td>\n              <td>Function (a: any, b: any) => boolean</td>\n              <td>The callback function used to determine equality of complex objects if they are used. If this is not provided, referential\n                equality will be used instead.</td>\n              <td>False</td>\n            </tr>\n\n            <tr>\n              <td>options</td>\n              <td>String[]</td>\n              <td>The list of all possible options.</td>\n              <td>True</td>\n            </tr>\n\n            <tr>\n              <td>orderedListHeader</td>\n              <td>String</td>\n              <td>The title placed over the right <code>&lt;select&gt;</code> element.</td>\n              <td>False</td>\n            </tr>\n\n            <tr>\n              <td>showFilter</td>\n              <td>Boolean</td>\n              <td>Whether or not to always show the filter bar over the left <code>&lt;select&gt;</code> element. <b>NOTE:</b> Using\n                this input will override the default logic of showing the filter bar when a certain number of elements are present.</td>\n              <td>False</td>\n            </tr>\n\n            <tr>\n              <td>hideUnorderedList</td>\n              <td>Boolean</td>\n              <td>Whether or not to hide the unordered list (left hand side). If set to true only the ordered list with up/down buttons will be visilble</td>\n              <td>False</td>\n            </tr>\n\n            <tr>\n              <td>unorderedListHeader</td>\n              <td>String</td>\n              <td>The title placed over the left <code>&lt;select&gt;</code> element.</td>\n              <td>False</td>\n            </tr>\n          </tbody>\n        </table>\n\n        <h3>\n          Component Outputs\n        </h3>\n        <table>\n          <thead>\n            <th>Parameter Name</th>\n            <th>Description</th>\n            <th>Required</th>\n          </thead>\n          <tbody>\n            <tr>\n              <td>valueChanged</td>\n              <td>An output event to notify the control consumer that the value of the control has changed due to user interaction. This is primarily to assist in the case of using objects to supply the control with data, where complex object change detection might not be performed.</td>\n              <td>False</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n\n      <section>\n        <h3>Ordered List Picker using primitive types</h3>\n\n        <sme-ordered-list-picker [(ngModel)]=\"primitiveSelectedOptions\" [options]=\"primitiveAllOptions\" [disabled]=\"primitivePickerDisabled\"\n          unorderedListHeader=\"Available Options\" orderedListHeader=\"Selected Options\"></sme-ordered-list-picker>\n\n        <div class=\"buttons-section\">\n          <button (click)=\"addToPrimitiveNgModel()\">Add item to 'ngModel'</button>\n          <button (click)=\"removeFromPrimitiveNgModel()\">Remove item from 'ngModel'</button>\n          <button (click)=\"addToPrimitiveAllOptions()\">Add item to 'options'</button>\n          <button (click)=\"removeFromPrimitiveAllOptions()\">Remove item from 'options'</button>\n          <button (click)=\"togglePrimitiveDisabled()\">Toggle disabled state</button>\n        </div>\n\n        <div class=\"value-spy\">\n          <p>VALUE</p>\n          <p><b>Picker is disabled</b>: {{ primitivePickerDisabled }}</p>\n          <textarea disabled=\"true\" ngModel=\"{{ primitiveSelectedOptions | json }}\"></textarea>\n        </div>\n\n        <div class=\"code-example\">\n          <p>CODE EXAMPLE</p>\n          <p>The above component's HTML looks like this:</p>\n          <code>&lt;sme-ordered-list-picker [(ngModel)]=&quot;primitiveSelectedOptions&quot; [options]=&quot;primitiveAllOptions&quot; [disabled]=&quot;primitivePickerDisabled&quot;\n          unorderedListHeader=&quot;Available Options&quot; orderedListHeader=&quot;Selected Options&quot;&gt;&lt;/sme-ordered-list-picker&gt;</code>\n        </div>\n      </section>\n\n      <section>\n        <h3>Ordered List Picker using complex types</h3>\n\n        <sme-ordered-list-picker [(ngModel)]=\"complexSelectedOptions\" [options]=\"complexAllOptions\" [equalsFunction]=\"equals\" [disabled]=\"complexPickerDisabled\"\n          displayNameField=\"name\" unorderedListHeader=\"Available Options\" orderedListHeader=\"Selected Options\" (valueChanged)=\"onComplexValueChanged($event)\"></sme-ordered-list-picker>\n\n        <div class=\"buttons-section\">\n          <button (click)=\"addToComplexNgModel()\">Add item to 'ngModel'</button>\n          <button (click)=\"removeFromComplexNgModel()\">Remove item from 'ngModel'</button>\n          <button (click)=\"addToComplexAllOptions()\">Add item to 'options'</button>\n          <button (click)=\"removeFromComplexAllOptions()\">Remove item from 'options'</button>\n          <button (click)=\"toggleComplexDisabled()\">Toggle disabled state</button>\n        </div>\n\n        <div class=\"value-spy\">\n          <p>VALUE</p>\n          <p><b>Picker is disabled</b>: {{ complexPickerDisabled }}</p>\n          <textarea disabled=\"true\" ngModel=\"{{ complexSelectedOptions | json }}\"></textarea>\n        </div>\n\n        <div class=\"code-example\">\n          <p>CODE EXAMPLE</p>\n          <p>The above component's HTML looks like this:</p>\n          <code>&lt;sme-ordered-list-picker [(ngModel)]=&quot;complexSelectedOptions&quot; [options]=&quot;complexAllOptions&quot; [equalsFunction]=&quot;equals&quot; [disabled]=&quot;complexPickerDisabled&quot;\n          displayNameField=&quot;name&quot; unorderedListHeader=&quot;Available Options&quot; orderedListHeader=&quot;Selected Options&quot; (valueChanged)=&quot;onComplexValueChanged($event)&quot;&gt;&lt;/sme-ordered-list-picker&gt;</code>\n        </div>\n      </section>\n\n      <section>\n        <h3>Large Data Sets &amp; Intended Use</h3>\n        <p>Below is an example of using the ordered list picker with many elements (~100). The ordered list picker's inteded use is\n          to manually pick a subset of data where order matters. Because of the manual user interaction, it is generally advised\n          to not use this component if the source data set is too large.</p>\n        <p>A common example of usage for this component would be a column chooser for a grid.</p>\n        <p><b>NOTE</b>: In it's current form, the ordered list picker does a lot of computations at a regular interval whenever it's\n          interacted with. Thusly, the performance of the tool will begin to degrade with the presence of too many entities. To\n          experience the control the way it's currently intended, try to keep the entity set to a max of around 100 items.</p>\n        <sme-ordered-list-picker [(ngModel)]=\"largeOptionsSelection\" [options]=\"largeOptions\" orderedListHeader=\"Ordered List\" unorderedListHeader=\"Unordered List\"></sme-ordered-list-picker>\n      </section>\n\n      <section>\n        <h3>Ordered List Picker hiding the unordered list</h3>\n\n        <sme-ordered-list-picker [(ngModel)]=\"primitiveSelectedOptions\" [options]=\"primitiveAllOptions\"\n          hideUnorderedList=\"true\" ></sme-ordered-list-picker>\n\n        <div class=\"value-spy\">\n          <p>VALUE</p>\n          <textarea disabled=\"true\" ngModel=\"{{ primitiveSelectedOptions | json }}\"></textarea>\n        </div>\n\n        <div class=\"code-example\">\n          <p>CODE EXAMPLE</p>\n          <p>The above component's HTML looks like this:</p>\n          <code>&lt;sme-ordered-list-picker [(ngModel)]=&quot;primitiveSelectedOptions&quot; [options]=&quot;primitiveAllOptions&quot; hideUnorderedList=&quot;true&quot;&gt;&lt;/sme-ordered-list-picker&gt;</code>\n        </div>\n      </section>\n    ",
                styles: ["\n      h1, h2, h3, h4, h5, h6 {\n        padding: 0;\n        margin-bottom: 12px;\n      }\n\n      h3 {\n          margin-top: 12px;\n      }\n\n      section {\n        margin-bottom: 48px;\n      }\n\n      table {\n        margin-top: 24px;\n      }\n\n      table, th, td {\n        border: 1px solid black;\n      }\n\n      textarea {\n        height: 300px;\n        width: 250px;\n      }\n\n      th, td {\n        padding: 6px !important;\n      }\n\n      p:first-of-type {\n        padding-top: 0;\n      }\n\n      .buttons-section {\n        margin-top: 12px;\n      }\n\n      .buttons-section button {\n        margin-right: 6px;\n      }\n\n      .buttons-section button:last-of-type {\n        margin-right: 0;\n      }\n\n      .code-example {\n        margin-top: 12px;\n        margin-bottom: 24px;\n      }\n\n      .code-example p {\n        margin-bottom: 12px;\n      }\n\n      .code-example p:first-of-type {\n        font-weight: bold;\n        margin-bottom: 0;\n      }\n\n      .code-example code {\n        font-size: 16px;\n        padding: 6px;\n      }\n\n      .value-spy {\n        margin-top: 12px;\n      }\n\n      .value-spy p:first-of-type {\n        font-weight: bold;\n        margin-bottom: 12px;\n      }\n\n      .value-spy p {\n          padding: 0;\n      }\n\n      .value-spy textarea {\n          margin-top: 12px;\n      }\n    "]
            },] },
];
/** @nocollapse */
OrderedListPickerExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9vcmRlcmVkLWxpc3QtcGlja2VyL29yZGVyZWQtbGlzdC1waWNrZXItZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFTMUM7SUFvQkk7UUFSUSxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBTWQsV0FBTSxHQUEwQyxVQUFDLENBQVcsRUFBRSxDQUFXLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQWpCLENBQWlCLENBQUM7UUFHbkcsSUFBTSxTQUFTLEdBQWE7WUFDeEIsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQztRQUVGLElBQU0sU0FBUyxHQUFhO1lBQ3hCLElBQUksRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRztZQUNyQixTQUFTO1lBQ1QsU0FBUztZQUNUO2dCQUNJLElBQUksRUFBRSxPQUFPO2FBQ2hCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87YUFDaEIsRUFBRTtnQkFDQyxJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87YUFDaEI7U0FDSixDQUFDO1FBRUYsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDdkIsWUFBWTtZ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LElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0seUVBQTZCLEdBQXBDO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLGlFQUFxQixHQUE1QjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUM3RCxDQUFDO0lBRU0sbUVBQXVCLEdBQTlCO1FBQ0ksSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2pFLENBQUM7SUF5U0wsd0NBQUM7QUFBRCxDQXhhQSxBQXdhQzs7QUF4U00sNENBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsOENBQThDO2dCQUN4RCxRQUFRLEVBQUUsMjZUQTRNVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQywwMkNBa0ZSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsZ0RBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoib3JkZXJlZC1saXN0LXBpY2tlci1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=