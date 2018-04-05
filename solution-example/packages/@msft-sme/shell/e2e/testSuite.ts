import * as fs from 'fs';
import { Settings } from './settings';
import { TestManager } from './testManager';
import { Utils } from './utils';

export class TestSuite {
    private static line = '***********';

    public testManager: TestManager<any>;

    private beforeEachAction: () => Promise<void>;
    private afterEachAction: () => Promise<void>;
    private screenshotValue = Settings.screenshot; 

    public describe(description: string, specDefinition: () => void): void {
        // Delete the log file first
        if (fs.existsSync(Utils.logFilePath)) {
            fs.unlinkSync(Utils.logFilePath);
        }

        if (fs.existsSync(Utils.failedTestsFilePath)) {
            fs.unlinkSync(Utils.failedTestsFilePath);
        }

        // Delete the screenshot folder
        Utils.deleteDirectory(Utils.screenshotsFolder);

        describe(description, specDefinition);
        this.afterEach(() => {
            return this.testManager.finishTestCaseAsync();
        });
    }

    public beforeEach(action: () => Promise<void>): void {
        this.beforeEachAction = async () => {
            await this.testManager.startTestCaseAsync();
            await action();
        };
        beforeEach((done) => {
            Utils.log('');
            Utils.log(TestSuite.line + ' Start preparing for test case ' + TestSuite.line);
            this.beforeEachAction().then(() => {
                Utils.log(TestSuite.line + ' Finish preparing for test case ' + TestSuite.line);
                done();
            });
        });
    }

    public afterEach(action: () => Promise<void>): void {
        this.afterEachAction = action;
        afterEach((done) => {
            Utils.log(TestSuite.line + ' Start wrapping up test case ' + TestSuite.line);
            this.afterEachAction().then(() => {
                Utils.log(TestSuite.line + ' Finish wrapping up test case ' + TestSuite.line);
                done();
            });
        });
    }

    public beforeAll(action: () => Promise<void>): void {
        beforeAll((done) => {
            Utils.log(TestSuite.line + ' Start preparing for all the tests ' + TestSuite.line);
            action().then(() => {
                Utils.log(TestSuite.line + ' Finish preparing for all the tests ' + TestSuite.line);
                done();
            });
        });
    }

    public afterAll(action: () => Promise<void>): void {
        afterAll((done) => {
            Utils.log(TestSuite.line + ' Start wrapping up all the tests ' + TestSuite.line);
            action().then(() => {
                Utils.log(TestSuite.line + ' Finish wrapping up all the tests ' + TestSuite.line);
                done();
            });
        });
    }

    public it(expectation: string, assertion: () => Promise<void>, retryCount = 2): void {
        if(Settings.onlyRun && expectation.indexOf(Settings.onlyRun)===-1){
            return;
        }
        
        it(expectation, (done) => {
            Utils.log(TestSuite.line + ' Start test case: it ' + expectation + ' ' + TestSuite.line);
            this.executeTestCaseAsync(expectation, assertion, retryCount).then(() => {
                Utils.logIndent--;
                Utils.log(TestSuite.line + 'Finish test case: it ' + expectation + ' ' + TestSuite.line);
                Settings.screenshot = this.screenshotValue;
                done();
            });
        });
    }

    private async executeTestCaseAsync(expectation: string, assertion: () => Promise<void>, retryCount: number): Promise<void> {
        try {
            await assertion();
        } catch (e) {
            if (retryCount > 0) {
                Utils.logIndent--;
                Utils.log(TestSuite.line + ' Retrying test case: it ' + expectation + ' ' + TestSuite.line);
                this.screenshotValue = Settings.screenshot;
                Settings.screenshot = 'true';

                await this.afterEachAction();
                await this.beforeEachAction();
                await this.executeTestCaseAsync(expectation, assertion, retryCount - 1);
            } else {
                await Utils.writeFailedTestToFile(expectation);
            }
        }
    }
}