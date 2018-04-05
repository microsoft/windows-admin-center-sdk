import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WizardComponent, WizardStep } from '../../../../../angular';
import { CharacterCreatorJobFormComponent } from './components/character-creator-job-form/character-creator-job-form.component';
import { CharacterCreatorNameFormComponent } from './components/character-creator-name-form/character-creator-name-form.component';
import { CharacterCreatorSpellFormComponent } from './components/character-creator-spell-form/character-creator-spell-form.component';
import { CharacterCreatorSummaryComponent } from './components/character-creator-summary/character-creator-summary.component';
import { Job } from './models/job';
import { Spell } from './models/spell';
var WizardExampleComponent = (function () {
    function WizardExampleComponent() {
    }
    WizardExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-wizard';
    };
    WizardExampleComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.forEach(function (subscription) {
                if (subscription) {
                    subscription.unsubscribe();
                }
            });
        }
    };
    WizardExampleComponent.prototype.ngOnInit = function () {
        this.subscriptions = [];
        this.initializeSteps();
        this.jobSubject = new BehaviorSubject(Job.Paladin);
        this.initializeModel();
    };
    WizardExampleComponent.prototype.configureStandardJobSteps = function () {
        this.summaryStep.dependencies = [
            this.nameStep,
            this.jobStep
        ];
        this.steps = [
            this.nameStep,
            this.jobStep,
            this.summaryStep
        ];
    };
    WizardExampleComponent.prototype.configureWizardJobSteps = function () {
        if (!(this.steps.length === 4 && this.steps[2].renderer === CharacterCreatorSpellFormComponent)) {
            var spellStep = new WizardStep(CharacterCreatorSpellFormComponent, {
                name: 'Choose a Spell',
                dependencies: [
                    this.jobStep
                ]
            });
            this.summaryStep.dependencies = [
                this.nameStep,
                this.jobStep,
                spellStep
            ];
            this.steps = [
                this.nameStep,
                this.jobStep,
                spellStep,
                this.summaryStep
            ];
        }
    };
    WizardExampleComponent.prototype.initializeModel = function () {
        var _this = this;
        this.model = {
            name: '',
            job: this.jobSubject,
            spell: Spell.Fire
        };
        this.subscriptions.push(this.model.job.subscribe(function (job) {
            _this.onJobChange(job);
        }));
    };
    WizardExampleComponent.prototype.initializeSteps = function () {
        this.nameStep = new WizardStep(CharacterCreatorNameFormComponent, {
            name: 'Character Name'
        });
        this.jobStep = new WizardStep(CharacterCreatorJobFormComponent, {
            name: 'Choose a Job',
            dependencies: [
                this.nameStep
            ]
        });
        this.summaryStep = new WizardStep(CharacterCreatorSummaryComponent, {
            name: 'Summary',
            dependencies: [
                this.nameStep,
                this.jobStep
            ]
        });
        this.steps = [
            this.nameStep,
            this.jobStep,
            this.summaryStep
        ];
    };
    WizardExampleComponent.prototype.onJobChange = function (job) {
        switch (job) {
            case Job.Wizard:
                this.configureWizardJobSteps();
                break;
            default:
                this.configureStandardJobSteps();
                break;
        }
    };
    return WizardExampleComponent;
}());
export { WizardExampleComponent };
WizardExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-wizard-example',
                template: "\n      <h1>Wizard Component</h1>\n\n      <section>\n        <h3>Description</h3>\n        <p>\n          The wizard component is a component for guiding a user through a series of steps to gather input in order to complete a complex\n          operation. A common use for a wizard is to collect input and to change the experience depending on the selection of the\n          user. Instead of just if-ing additional inputs into existence based on the user's selection, the wizard component allows\n          us to specify which steps are shown. The developer consuming the tool can react to selections users have made in the\n          wizard and change the steps accordingly.\n        </p>\n\n        <p>\n          There are three parts to the wizard tool: The step list, the rendered component, and the navigation buttons. The wizard works\n          by dynamically rendering components in a region of the tool based on the selection in the steps list. The preferred method\n          of navigating the wizard is either by clicking steps or using the back/next buttons. If the consumer of the wizard wants\n          to provide their own buttons and functionality, they can include a <code>&lt;sme-wizard-footer&gt;&lt;/sme-wizard-footer&gt;</code>    inside of the <code>&lt;sme-wizard&gt;&lt;/sme-wizard&gt;</code>. Additionally, you can call <code>moveToNextStep()</code>    or\n          <code>moveToPreviousStep()</code> methods on the <code>WizardComponent</code> class. In order to do this, you can declare\n          a <code>@ViewChild(WizardComponent) public wizardComponent</code> class member of whatever component is consuming the\n          wizard. This will allow you to programmatically interact with your wizard component.\n        </p>\n\n        <p>\n          When the consumer of the component is initializing their steps, they can declare dependency on other steps that blocks them\n          from being manually accessed until the dependencies are completed. <b>NOTE:</b> A step having dependencies does NOT\n          block programmatically moving to another step. It's up to the developer to ensure that buttons or whatever they're using\n          to navigate are disabled properly.\n        </p>\n\n        <p>The prerequisites for using the wizard component are as follows:</p>\n        <ul>\n          <li>\n            Any component to be dynamically rendered by the wizard must extend the <code>WizardStepComponent</code> class.\n          </li>\n          <li>\n            Any component to be dynamically rendered by the wizard must be included in the <code>entryComponents</code> array in\n            the module defintion that imports the wizard.\n          </li>\n          <li>\n            The model input must extend the <code>WizardModel</code> interface.\n          </li>\n        </ul>\n      </section>\n\n      <section>\n        <h3>Guidelines</h3>\n\n        <p>Below are some guidelines regarding specific details around using the component.</p>\n\n        <h5>Buttons &amp; Interactions</h5>\n        <p>\n          In an attempt to not restrict users and their scenarios, the wizard component was developed with the ability to customize\n          what buttons are included for navigation. The wizard component exposes navigation methods in order to facilitate this.\n        </p>\n\n        <p>\n          The recommendation for users is to have a \"Back\" button, a \"Next\" button, and a \"Cancel\" button. Additionally, when the user\n          reaches the last step or they're about to take action based on the information the wizard has been collecting, the \"Next\"\n          button should become a \"Save\" or \"Finish\" button.\n        </p>\n\n        <h5>Data Model State</h5>\n        <p>\n          Due to the complex/varying nature of the data models that can be passed in, the wizard component makes no direct changes\n          to the data model. Instead, it is up to the component of each step to modify it. Additionally, in order to properly reset\n          the data model, the consumer of the wizard component will need to \"zero-out\" or reset the data model themselves.\n        </p>\n\n        <h5>Validation</h5>\n        <p>\n          There are multiple aspects to validation with the wizard component. Firstly, every component who extends\n          <code>WizardStepComponent</code> gets access to a public attribute <code>valid</code>. The built in buttons that come\n          with the wizard for navigation use this as the primary disabled state indicator. Update this class member whenever the\n          state changes.\n        </p>\n        <p>\n          Additionally, the wizard comes with validation hooks for after the built in next button has been clicked. In order to take\n          advantage of this, in your component that extends <code>WizardStepComponent</code>, you need to set the class callback\n          function <code>runValidation()</code> to a callback that returns an <code>Observable&lt;WizardStepValidation&gt;</code>.\n        </p>\n\n      </section>\n\n      <section>\n        <h3>Parameters</h3>\n        <table>\n          <thead>\n            <th>Name</th>\n            <th>Description</th>\n            <th>Type</th>\n            <th>Required</th>\n          </thead>\n          <tbody>\n            <tr>\n              <td>model</td>\n              <td>The data model for sharing data across the wizard.</td>\n              <td>T extends WizardModel</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>steps</td>\n              <td>The steps the wizard will progress through.</td>\n              <td>WizardStep[]</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>title</td>\n              <td>The title of the wizard.</td>\n              <td>string</td>\n              <td>False</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n\n      <section>\n        <h3>Events</h3>\n        <table>\n          <thead>\n            <th>Name</th>\n            <th>Description</th>\n          </thead>\n          <tbody>\n            <tr>\n              <td>onCancelClicked</td>\n              <td>The event fired when the cancel button is clicked.</td>\n            </tr>\n            <tr>\n              <td>onComponentSubmitted</td>\n              <td>The event fired when the rendered component calls <code>componentSubmitted()</code>.</td>\n            </tr>\n            <tr>\n              <td>onError</td>\n              <td>The event fired when the result of <code>runValidation()</code> indicates <code>isValid</code> is false.</td>\n            </tr>\n            <tr>\n              <td>onFinishClicked</td>\n              <td>The event fired when the finish button is clicked.</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n\n      <section>\n        <h3>Attributes</h3>\n        <table>\n          <thead>\n            <th>Name</th>\n            <th>Description</th>\n            <th>Type</th>\n            <th>Read Only</th>\n          </thead>\n          <tbody>\n            <tr>\n              <td>backButtonText</td>\n              <td>The text of the back button.</td>\n              <td>string</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>cancelButtonText</td>\n              <td>The text of the cancel button.</td>\n              <td>string</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>currentStep</td>\n              <td>The current step of the wizard.</td>\n              <td>WizardStep</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>currentStepComponent</td>\n              <td>The dynamically rendered component of the current step.</td>\n              <td>WizardStepComponent&lt;WizardModel&gt;</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>model</td>\n              <td>The data model for sharing data across the wizard. <b>NOTE</b>: This is the same data model that is also a required\n                input to the component.</td>\n              <td>T extends WizardModel</td>\n              <td>False</td>\n            </tr>\n            <tr>\n              <td>nextButtonText</td>\n              <td>The text of the next button.</td>\n              <td>string</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>showButtons</td>\n              <td>Whether or not to show built-in navigation buttons.</td>\n              <td>boolean</td>\n              <td>True</td>\n            </tr>\n            <tr>\n              <td>stepIndex</td>\n              <td>The index of the current step of the wizard.</td>\n              <td>number</td>\n              <td>False</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n\n      <section>\n        <h3>Methods</h3>\n        <table>\n          <thead>\n            <th>Name</th>\n            <th>Description</th>\n            <th>Return Type</th>\n          </thead>\n          <tbody>\n            <tr>\n              <td>completeCurrentStep()</td>\n              <td>Completes the current step of the wizard and returns the latest completed state.</td>\n              <td>boolean</td>\n            </tr>\n            <tr>\n              <td>completeStep(stepIndex: number)</td>\n              <td>Completes the specified step of the wizard (if possible) and returns the latest completed state.</td>\n              <td>boolean</td>\n            </tr>\n            <tr>\n              <td>failCurrentStep()</td>\n              <td>Fails the current step of the wizard and returns the latest completed state.</td>\n              <td>boolean</td>\n            </tr>\n            <tr>\n              <td>failStep(stepIndex: number)</td>\n              <td>Fails the specified step of the wizard (if possible) and returns the latest completed state.</td>\n              <td>boolean</td>\n            </tr>\n            <tr>\n              <td>moveToNextStep()</td>\n              <td>Moves the wizard to the next step, if possible.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>moveToPreviousStep()</td>\n              <td>Moves the wizard to the previous step, if possible.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>ngOnInit()</td>\n              <td>The method run when the components inputs are initialized.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>onBackClick()</td>\n              <td>The method called when the back button is clicked.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>onCancelClick()</td>\n              <td>The method called when the cancel button is clicked.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>onNextClick()</td>\n              <td>The method called when the next/finish button is clicked.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>onStepClick()</td>\n              <td>The method called when a step is clicked.</td>\n              <td>void</td>\n            </tr>\n            <tr>\n              <td>reset()</td>\n              <td>Resets every step of the wizard to be incomplete and moves back to the first step.</td>\n              <td>void</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n\n      <section>\n        <h3>Example: Character Creator</h3>\n\n        <div class=\"code-example\">\n          <p>Example Code</p>\n          <code>&lt;sme-wizard [steps]=&quot;steps&quot; [model]=&quot;model&quot; title=&quot;Character Creator&quot;&gt;&lt;/sme-wizard&gt;</code>\n        </div>\n\n        <sme-wizard [steps]=\"steps\" [model]=\"model\" title=\"Character Creator\"></sme-wizard>\n      </section>\n    ",
                styles: ["\n      table {\n        margin-top: 24px;\n      }\n\n      table, th, td {\n        border: 1px solid black;\n      }\n\n      th, td {\n        padding: 6px !important;\n      }\n\n      .code-example {\n        margin-top: 12px;\n        margin-bottom: 24px;\n      }\n\n      .code-example p {\n        margin-bottom: 12px;\n      }\n\n      .code-example p:first-of-type {\n        font-weight: bold;\n        margin-bottom: 0;\n      }\n\n      .value-spy {\n        margin-top: 12px;\n      }\n\n      .value-spy p:first-of-type {\n        font-weight: bold;\n        margin-bottom: 12px;\n      }\n\n      .value-spy p {\n          padding: 0;\n      }\n\n      .value-spy textarea {\n          margin-top: 12px;\n      }\n\n      textarea {\n        height: 300px;\n        width: 250px;\n      }\n\n      .wizard-buttons {\n          float: right;\n      }\n    "]
            },] },
];
/** @nocollapse */
WizardExampleComponent.ctorParameters = function () { return []; };
WizardExampleComponent.propDecorators = {
    'wizard': [{ type: ViewChild, args: [WizardComponent,] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy93aXphcmQvd2l6YXJkLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQThCLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFFeEUsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxzQkFBQSxDQUF1QjtBQUd2RCxPQUFPLEVBQXFCLGVBQUEsRUFBOEIsVUFBQSxFQUFXLE1BQU8sd0JBQUEsQ0FBeUI7QUFDckcsT0FBTyxFQUFFLGdDQUFBLEVBQWlDLE1BQU8sOEVBQUEsQ0FBK0U7QUFDaEksT0FBTyxFQUFFLGlDQUFBLEVBQWtDLE1BQU8sZ0ZBQUEsQ0FBaUY7QUFDbkksT0FBTyxFQUFFLGtDQUFBLEVBQW1DLE1BQU8sa0ZBQUEsQ0FBbUY7QUFDdEksT0FBTyxFQUFFLGdDQUFBLEVBQWlDLE1BQU8sNEVBQUEsQ0FBNkU7QUFFOUgsT0FBTyxFQUFFLEdBQUEsRUFBSSxNQUFPLGNBQUEsQ0FBZTtBQUNuQyxPQUFPLEVBQUUsS0FBQSxFQUFNLE1BQU8sZ0JBQUEsQ0FBaUI7QUFHdkM7SUFBQTtJQWdmQSxDQUFDO0lBOWRpQixzQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFTSw0Q0FBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtnQkFDcEMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDZixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQy9CLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU0seUNBQVEsR0FBZjtRQUNJLElBQUksQ0FB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QUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2dCQUMvQixLQUFLLENBQUM7WUFDVjtnQkFDSSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztnQkFDakMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFvV0wsNkJBQUM7QUFBRCxDQWhmQSxBQWdmQzs7QUFuV00saUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQyxRQUFRLEVBQUUsc3ZYQWtTVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQywyMkJBb0RSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFDSyxxQ0FBYyxHQUEyQztJQUNoRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFHLEVBQUUsRUFBRTtDQUMxRCxDQUFDIiwiZmlsZSI6IndpemFyZC1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=