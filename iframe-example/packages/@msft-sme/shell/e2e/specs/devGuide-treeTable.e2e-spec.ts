let strings = require('../../assets/strings/strings.json');
import { BaseUI, Settings, TestManager, Utils } from '../';
import { DevGuide } from '../ui/devGuide';
import { WebElement } from 'selenium-webdriver';

let testManager = new TestManager<DevGuide>(new DevGuide('Dev Guide'));
testManager.testShell = true;

testManager.testSuite.describe('Dev Guide | tree-table', () => {
    testManager.testSuite.beforeEach(async () => {
        await testManager.shell.goToSolutionAsync('Dev Guide');
        await testManager.tool.categoryTab.clickByTextAsync('Controls');
        await testManager.tool.controlList.clickByTextAsync('tree-table');
    });

    testManager.testSuite.it('should be clear the selection in multiple selection scenario', async () => {
        let selectionCountSpan = testManager.tool.getChildUIObject({ name: 'Selection count', selector: '.selectionCount' });
        let clearSelectionButton = testManager.tool.getChildUIObject({ name: 'Clear Selection button', selector: '.clearSelection' });

        await testManager.tool.tabInControlDemoUI.clickByTextAsync('Multiple Selection in Tree Table');
        await testManager.tool.treeTable.GoToNodeByPathAsync('src/resources');
        expect(await selectionCountSpan.getTextAsync()).toEqual('16 items');

        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
        await Utils.sendKeyToActiveElement(Utils.Key.SPACE);
        expect(await selectionCountSpan.getTextAsync()).toEqual('15 items');

        await Utils.sendKeyToActiveElement(Utils.Key.SPACE);
        expect(await selectionCountSpan.getTextAsync()).toEqual('16 items');

        await clearSelectionButton.clickAsync();
        expect(await selectionCountSpan.getTextAsync()).toEqual('');
    });
}, ['servers']);