import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

export interface MyObject {
    name: string;
}

@Component({
    selector: 'sme-ng2-controls-ordered-list-picker-example',
    template: `
      <section>
        <h2>Ordered List Picker Component</h2>
        <p>
          The ordered list picker is a complex component that requires multiple inputs. The component supports using <b>primitive</b>    types such as:
        </p>

        <ul>
          <li>strings</li>
          <li>numbers</li>
        </ul>

        <p>
          Additionally, the component supports the use of your own complex objects. The only requirement in the simplest case is to
          have a list of all possible elements between the two boxes (named <code>options</code>). The component will compute
          the contents of the left <code>&lt;select&gt;</code> by diffing the options passed in against the current value of the
          component. The current value of the component is represented by the contents of the right <code>&lt;select&gt;</code>    initialized/accessed via the <code>ngModel</code> attribute as shown in the examples below.
        </p>

        <p>
          Another feature of the component is built in filtering for the left <code>&lt;select&gt;</code> element. By default,
          if there are over <b>20</b> items in the <code>options</code> array, the filter bar will appear. This behavior can be
          overriden by using the <code>filter</code> component input. If this is set to <code>false</code>, the filter bar will
          never show. If the value is set to <code>true</code>, the filter bar will always show.
        </p>

        <p>The component also supports double-clicking to transfer items between the boxes.</p>

        <h3>
          Component Inputs
        </h3>

        <table>
          <thead>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
          </thead>
          <tbody>
            <tr>
              <td>disabled</td>
              <td>Boolean</td>
              <td>Whether or not the control is disabled.</td>
              <td>False</td>
            </tr>

            <tr>
              <td>displayFieldName</td>
              <td>String</td>
              <td>The name of the attribute/field of a complex object to use as the display name of an option.</td>
              <td>False</td>
            </tr>

            <tr>
              <td>equalsFunction</td>
              <td>Function (a: any, b: any) => boolean</td>
              <td>The callback function used to determine equality of complex objects if they are used. If this is not provided, referential
                equality will be used instead.</td>
              <td>False</td>
            </tr>

            <tr>
              <td>options</td>
              <td>String[]</td>
              <td>The list of all possible options.</td>
              <td>True</td>
            </tr>

            <tr>
              <td>orderedListHeader</td>
              <td>String</td>
              <td>The title placed over the right <code>&lt;select&gt;</code> element.</td>
              <td>False</td>
            </tr>

            <tr>
              <td>showFilter</td>
              <td>Boolean</td>
              <td>Whether or not to always show the filter bar over the left <code>&lt;select&gt;</code> element. <b>NOTE:</b> Using
                this input will override the default logic of showing the filter bar when a certain number of elements are present.</td>
              <td>False</td>
            </tr>

            <tr>
              <td>hideUnorderedList</td>
              <td>Boolean</td>
              <td>Whether or not to hide the unordered list (left hand side). If set to true only the ordered list with up/down buttons will be visilble</td>
              <td>False</td>
            </tr>

            <tr>
              <td>unorderedListHeader</td>
              <td>String</td>
              <td>The title placed over the left <code>&lt;select&gt;</code> element.</td>
              <td>False</td>
            </tr>
          </tbody>
        </table>

        <h3>
          Component Outputs
        </h3>
        <table>
          <thead>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
          </thead>
          <tbody>
            <tr>
              <td>valueChanged</td>
              <td>An output event to notify the control consumer that the value of the control has changed due to user interaction. This is primarily to assist in the case of using objects to supply the control with data, where complex object change detection might not be performed.</td>
              <td>False</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Ordered List Picker using primitive types</h3>

        <sme-ordered-list-picker [(ngModel)]="primitiveSelectedOptions" [options]="primitiveAllOptions" [disabled]="primitivePickerDisabled"
          unorderedListHeader="Available Options" orderedListHeader="Selected Options"></sme-ordered-list-picker>

        <div class="buttons-section">
          <button (click)="addToPrimitiveNgModel()">Add item to 'ngModel'</button>
          <button (click)="removeFromPrimitiveNgModel()">Remove item from 'ngModel'</button>
          <button (click)="addToPrimitiveAllOptions()">Add item to 'options'</button>
          <button (click)="removeFromPrimitiveAllOptions()">Remove item from 'options'</button>
          <button (click)="togglePrimitiveDisabled()">Toggle disabled state</button>
        </div>

        <div class="value-spy">
          <p>VALUE</p>
          <p><b>Picker is disabled</b>: {{ primitivePickerDisabled }}</p>
          <textarea disabled="true" ngModel="{{ primitiveSelectedOptions | json }}"></textarea>
        </div>

        <div class="code-example">
          <p>CODE EXAMPLE</p>
          <p>The above component's HTML looks like this:</p>
          <code>&lt;sme-ordered-list-picker [(ngModel)]=&quot;primitiveSelectedOptions&quot; [options]=&quot;primitiveAllOptions&quot; [disabled]=&quot;primitivePickerDisabled&quot;
          unorderedListHeader=&quot;Available Options&quot; orderedListHeader=&quot;Selected Options&quot;&gt;&lt;/sme-ordered-list-picker&gt;</code>
        </div>
      </section>

      <section>
        <h3>Ordered List Picker using complex types</h3>

        <sme-ordered-list-picker [(ngModel)]="complexSelectedOptions" [options]="complexAllOptions" [equalsFunction]="equals" [disabled]="complexPickerDisabled"
          displayNameField="name" unorderedListHeader="Available Options" orderedListHeader="Selected Options" (valueChanged)="onComplexValueChanged($event)"></sme-ordered-list-picker>

        <div class="buttons-section">
          <button (click)="addToComplexNgModel()">Add item to 'ngModel'</button>
          <button (click)="removeFromComplexNgModel()">Remove item from 'ngModel'</button>
          <button (click)="addToComplexAllOptions()">Add item to 'options'</button>
          <button (click)="removeFromComplexAllOptions()">Remove item from 'options'</button>
          <button (click)="toggleComplexDisabled()">Toggle disabled state</button>
        </div>

        <div class="value-spy">
          <p>VALUE</p>
          <p><b>Picker is disabled</b>: {{ complexPickerDisabled }}</p>
          <textarea disabled="true" ngModel="{{ complexSelectedOptions | json }}"></textarea>
        </div>

        <div class="code-example">
          <p>CODE EXAMPLE</p>
          <p>The above component's HTML looks like this:</p>
          <code>&lt;sme-ordered-list-picker [(ngModel)]=&quot;complexSelectedOptions&quot; [options]=&quot;complexAllOptions&quot; [equalsFunction]=&quot;equals&quot; [disabled]=&quot;complexPickerDisabled&quot;
          displayNameField=&quot;name&quot; unorderedListHeader=&quot;Available Options&quot; orderedListHeader=&quot;Selected Options&quot; (valueChanged)=&quot;onComplexValueChanged($event)&quot;&gt;&lt;/sme-ordered-list-picker&gt;</code>
        </div>
      </section>

      <section>
        <h3>Large Data Sets &amp; Intended Use</h3>
        <p>Below is an example of using the ordered list picker with many elements (~100). The ordered list picker's inteded use is
          to manually pick a subset of data where order matters. Because of the manual user interaction, it is generally advised
          to not use this component if the source data set is too large.</p>
        <p>A common example of usage for this component would be a column chooser for a grid.</p>
        <p><b>NOTE</b>: In it's current form, the ordered list picker does a lot of computations at a regular interval whenever it's
          interacted with. Thusly, the performance of the tool will begin to degrade with the presence of too many entities. To
          experience the control the way it's currently intended, try to keep the entity set to a max of around 100 items.</p>
        <sme-ordered-list-picker [(ngModel)]="largeOptionsSelection" [options]="largeOptions" orderedListHeader="Ordered List" unorderedListHeader="Unordered List"></sme-ordered-list-picker>
      </section>

      <section>
        <h3>Ordered List Picker hiding the unordered list</h3>

        <sme-ordered-list-picker [(ngModel)]="primitiveSelectedOptions" [options]="primitiveAllOptions"
          hideUnorderedList="true" ></sme-ordered-list-picker>

        <div class="value-spy">
          <p>VALUE</p>
          <textarea disabled="true" ngModel="{{ primitiveSelectedOptions | json }}"></textarea>
        </div>

        <div class="code-example">
          <p>CODE EXAMPLE</p>
          <p>The above component's HTML looks like this:</p>
          <code>&lt;sme-ordered-list-picker [(ngModel)]=&quot;primitiveSelectedOptions&quot; [options]=&quot;primitiveAllOptions&quot; hideUnorderedList=&quot;true&quot;&gt;&lt;/sme-ordered-list-picker&gt;</code>
        </div>
      </section>
    `,
    styles: [`
      h1, h2, h3, h4, h5, h6 {
        padding: 0;
        margin-bottom: 12px;
      }

      h3 {
          margin-top: 12px;
      }

      section {
        margin-bottom: 48px;
      }

      table {
        margin-top: 24px;
      }

      table, th, td {
        border: 1px solid black;
      }

      textarea {
        height: 300px;
        width: 250px;
      }

      th, td {
        padding: 6px !important;
      }

      p:first-of-type {
        padding-top: 0;
      }

      .buttons-section {
        margin-top: 12px;
      }

      .buttons-section button {
        margin-right: 6px;
      }

      .buttons-section button:last-of-type {
        margin-right: 0;
      }

      .code-example {
        margin-top: 12px;
        margin-bottom: 24px;
      }

      .code-example p {
        margin-bottom: 12px;
      }

      .code-example p:first-of-type {
        font-weight: bold;
        margin-bottom: 0;
      }

      .code-example code {
        font-size: 16px;
        padding: 6px;
      }

      .value-spy {
        margin-top: 12px;
      }

      .value-spy p:first-of-type {
        font-weight: bold;
        margin-bottom: 12px;
      }

      .value-spy p {
          padding: 0;
      }

      .value-spy textarea {
          margin-top: 12px;
      }
    `]
})
export class OrderedListPickerExampleComponent {
    public complexAllOptions: MyObject[];
    public complexPickerDisabled: boolean;
    public complexSelectedOptions: MyObject[];

    public largeOptions: string[];
    public largeOptionsSelection: string[];

    public primitiveAllOptions: string[];
    public primitivePickerDisabled: boolean;
    public primitiveSelectedOptions: string[];

    private counter = 65;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-ordered-list-picker';
    }

    public equals: (a: MyObject, b: MyObject) => boolean = (a: MyObject, b: MyObject) => a.name === b.name;

    constructor() {
        const myObject1: MyObject = {
            name: 'Jason'
        };

        const myObject2: MyObject = {
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

        const myPrimitive1 = 'Jason';
        const myPrimitive2 = 'Joey';
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
        for (let i = 0; i < 100; i++) {
            this.largeOptions.push(i.toString());
        }
    }

    public addToComplexNgModel(): void {
        let str = String.fromCharCode(this.counter++);
        let obj: MyObject = {
            name: str
        };

        this.complexSelectedOptions.push(obj);
        this.complexAllOptions.push(obj);
    }

    public addToPrimitiveNgModel(): void {
        let str = String.fromCharCode(this.counter++);

        this.primitiveSelectedOptions.push(str);
        this.primitiveAllOptions.push(str);
    }

    public addToComplexAllOptions(): void {
        let str = String.fromCharCode(this.counter++);
        this.complexAllOptions.push({
            name: str
        });
    }

    public addToPrimitiveAllOptions(): void {
        let str = String.fromCharCode(this.counter++);
        this.primitiveAllOptions.push(str);
    }

    public onComplexValueChanged(event: any): void {
        console.log(event);
    }

    public removeFromComplexNgModel(): void {
        let target = this.complexSelectedOptions[this.complexSelectedOptions.length - 1];
        MsftSme.remove(this.complexSelectedOptions, target);
    }

    public removeFromPrimitiveNgModel(): void {
        let target = this.primitiveSelectedOptions[this.primitiveSelectedOptions.length - 1];
        MsftSme.remove(this.primitiveSelectedOptions, target);
    }

    public removeFromComplexAllOptions(): void {
        let target = this.complexAllOptions[this.complexAllOptions.length - 1];
        MsftSme.remove(this.complexAllOptions, target);
        MsftSme.remove(this.complexSelectedOptions, target);
    }

    public removeFromPrimitiveAllOptions(): void {
        let target = this.primitiveAllOptions[this.primitiveAllOptions.length - 1];
        MsftSme.remove(this.primitiveAllOptions, target);
        MsftSme.remove(this.primitiveSelectedOptions, target);
    }

    public toggleComplexDisabled(): void {
        this.complexPickerDisabled = !this.complexPickerDisabled;
    }

    public togglePrimitiveDisabled(): void {
        this.primitivePickerDisabled = !this.primitivePickerDisabled;
    }
}
