let strings = require('../../assets/strings/strings.json');
import { BaseUI, Settings, Shell, TestManager, Utils } from '../';
import { WebElement } from 'selenium-webdriver';

let testManager = new TestManager<BaseUI>(new BaseUI('Tool'));
testManager.testShell = true;

testManager.testSuite.describe('Shell', () => {
    testManager.testSuite.beforeEach(async () => {
    });

    testManager.testSuite.it('should be able to navigate to a tool', async () => {
        await testManager.goToConnectionAndToolAsync(Settings.connection, 'Services');
    });
}, ['servers']);
