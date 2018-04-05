import * as fs from 'fs';
import { Settings } from './settings';
import { TestManager } from './testManager';
import { Utils } from './utils';

export class TestSuite {
    public static currentTestCaseProgress: TestCaseProgress;
    public static currentTestCaseFailed: boolean;
    public static currentRetryCount: number;
    public static currentSuiteName: string;
    public static currentSpecName: string;
    public static inlineTestReport: { failedSpecs: { name: string, failures: { message: string, stackTrace: string }[] }[] } = { failedSpecs: [] };
    public suiteCategoryMapping: { [name: string]: string } = {};

    private static line = '***********';

    private beforeEachAction: () => Promise<void>;
    private afterEachActions: (() => Promise<void>)[] = [];
    private screenshotValue = Settings.screenshot;

    private jasmineSpecAddExpectationResult;

    public testManager: TestManager<any>;

    public describe(description: string, specDefinition: () => void, connectionTypes: string[] = ['servers']): void {
        // Delete the log file first
        if (fs.existsSync(Utils.logFilePath)) {
            fs.unlinkSync(Utils.logFilePath);
        }

        if (fs.existsSync(Utils.failedTestsFilePath)) {
            fs.unlinkSync(Utils.failedTestsFilePath);
        }

        // Delete the screenshot folder
        Utils.deleteDirectory(Utils.screenshotsFolder);

        for (let i = 0; i < connectionTypes.length; i++) {
            let specName = description + ' in ' + connectionTypes[i];
            this.suiteCategoryMapping[specName] = connectionTypes[i];
            let that = this;
            describe(specName, () => {
                that.afterEach(async () => {
                    await that.testManager.finishTestCaseAsync();
                });

                specDefinition();
            });
        }
    }

    public beforeEach(action: () => Promise<void>): void {
        Utils.logIndent = 0;
        this.beforeEachAction = async () => {
            TestSuite.currentTestCaseFailed = false;
            await this.testManager.startTestCaseAsync();

            TestSuite.currentRetryCount = 3;
            await Utils.retryAsync(async () => {
                TestSuite.currentRetryCount--;
                TestSuite.currentTestCaseProgress = TestCaseProgress.beforeEach;
                Utils.logIndent = 0;

                let shouldRetryAnotherConnection = false;
                do {
                    try {
                        if (Settings.testResourceConfig) {
                            await this.testManager.resolveTestConnectionAsync(this.suiteCategoryMapping[TestSuite.currentSuiteName]);
                        }
                        await action();
                        shouldRetryAnotherConnection = false;
                    } catch (e) {
                        if (e === 'Connection Error') {
                            Utils.log('Detect connection error, retry the beforeEach again.');
                            shouldRetryAnotherConnection = true;
                        } else {
                            shouldRetryAnotherConnection = false;
                            throw e;
                        }
                    }
                    Utils.logIndent = 0;
                } while (shouldRetryAnotherConnection);
            }, 'Tries to do "beforeEach"');
        };
        Utils.logIndent = 0;

        let that = this;
        beforeEach((done) => {
            Utils.log('');
            Utils.log(TestSuite.line + ' Start preparing for test case: ' + TestSuite.currentSpecName + ' ' + TestSuite.line);
            this.testManager.connectionCandidates = null;
            that.beforeEachAction().then(
                () => {
                    Utils.log(TestSuite.line + ' Finish preparing for test case ' + TestSuite.line);
                    done();
                }, error => {
                    TestSuite.currentTestCaseFailed = true;
                    TestSuite.currentRetryCount = 0;
                    fail(error);
                    done();
                });
        });
    }

    public afterEach(action: () => Promise<void>): void {
        let afterEachActualAction = async () => {
            await Utils.retryAsync(async () => {
                Utils.logIndent = 0;
                TestSuite.currentTestCaseProgress = TestCaseProgress.afterEach;
                await action();
            }, 'Tries to do "afterEach"');
        };
        this.afterEachActions.push(afterEachActualAction);

        let that = this;
        afterEach((done) => {
            Utils.log(TestSuite.line + ' Start wrapping up test case: ' + TestSuite.currentSpecName + ' ' + TestSuite.line);
            afterEachActualAction().then(() => {
                Utils.log(TestSuite.line + ' Finish wrapping up test case ' + TestSuite.line);
                Utils.logIndent = 0;
                done();
            }).catch(error => {
                TestSuite.currentTestCaseFailed = true;
                TestSuite.currentRetryCount = 0;
                fail(error);
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
        if (Settings.onlyRun && expectation.indexOf(Settings.onlyRun) === -1) {
            return;
        }

        let that = this;
        let item = it(expectation, (done) => {
            if (!TestSuite.currentTestCaseFailed) {
                TestSuite.currentTestCaseProgress = TestCaseProgress.it;
                Utils.log(TestSuite.line + ' Start test case: ' + TestSuite.currentSpecName + ' ' + TestSuite.line);
                that.executeTestCaseAsync(expectation, assertion, retryCount).then(() => {
                    Utils.log(TestSuite.line + ' Finish test case: ' + TestSuite.currentSpecName + ' ' + TestSuite.line);
                    Settings.screenshot = that.screenshotValue;
                    done();
                }, error => {
                    done();
                });
            } else {
                done();
            }
        });
    }

    private async executeTestCaseAsync(expectation: string, assertion: () => Promise<void>, retryCount: number): Promise<void> {
        TestSuite.currentTestCaseProgress = TestCaseProgress.it;
        TestSuite.currentTestCaseFailed = false;
        TestSuite.currentRetryCount = retryCount;
        try {
            Utils.logIndent = 0;
            await assertion();
            Utils.logIndent = 0;

            if (TestSuite.currentTestCaseFailed) {
                throw 'Test case failed';
            }
        } catch (e) {
            Utils.logIndent = 0;
            if (retryCount > 0) {
                Utils.log('Unhandled exception: ' + e);
                Utils.log(TestSuite.line + ' Retrying test case (Remaining attempt count: ' + retryCount + '): it '
                    + expectation + ' ' + TestSuite.line);
                this.screenshotValue = Settings.screenshot;
                Settings.screenshot = 'true';

                // Jasmine executes the "afterEach" based on last in first out order.
                // So when we do the retry, we also need to follow this order.
                for (let i = this.afterEachActions.length - 1; i >= 0; i--) {
                    await this.afterEachActions[i]();
                }
                await this.beforeEachAction();
                await this.executeTestCaseAsync(expectation, assertion, retryCount - 1);
            } else {
                fail(e);
                await Utils.writeFailedTestToFile(expectation);
            }
        }
    }
}

let jasmineSpec = jasmine['Spec'];

jasmineSpec.prototype.wrappedAddExpectationResult = jasmineSpec.prototype.addExpectationResult;
jasmineSpec.prototype.addExpectationResult = function (passed, data, isError) {
    if (!passed) {
        Utils.log('Test Failure: ' + data.message);

        if ((TestSuite.currentTestCaseProgress === TestCaseProgress.beforeEach && TestSuite.currentRetryCount === 0)
            || TestSuite.currentTestCaseProgress === TestCaseProgress.it) {
            TestSuite.currentTestCaseFailed = true;
        }
    }
    if (!passed && TestSuite.currentRetryCount === 0) {
        this.wrappedAddExpectationResult(passed, data, isError);
    }
}

jasmine.getEnv().addReporter({
    suiteStarted: result => {
        TestSuite.currentSuiteName = result.fullName;
    },
    specStarted: result => {
        TestSuite.currentSpecName = result.fullName;
    },
    specDone: result => {
        let specResult = [];
        if (result.failedExpectations.length > 0) {
            for (let i = 0; i < result.failedExpectations.length; i++) {
                specResult.push({
                    message: result.failedExpectations[i].message,
                    stackTrace: result.failedExpectations[i].stack
                });
            }
            TestSuite.inlineTestReport.failedSpecs.push({
                name: result.fullName,
                failures: specResult
            });
        }
    },
    jasmineDone: () => {
        TestSuite.inlineTestReport.failedSpecs.forEach(spec => {
            console.log('');
            console.log('---------------------------------------------');
            console.log('Failed Spec: ' + spec.name);
            spec.failures.forEach(failure => {
                console.log('   ' + failure.message);
            });
            console.log('---------------------------------------------');
        });
        console.log('');
    }
});

export enum TestCaseProgress {
    beforeEach,
    it,
    afterEach
}