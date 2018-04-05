let strings = require('../../assets/strings/strings.json');
import { BaseUI, Settings, TestManager, Utils } from '../';
import { DevGuide } from '../ui/devGuide';
import { WebElement } from 'selenium-webdriver';

let testManager = new TestManager<DevGuide>(new DevGuide('Dev Guide'));
testManager.testShell = true;

testManager.testSuite.describe('Dev Guide | data-table', () => {
    testManager.testSuite.beforeEach(async () => {
        await testManager.shell.goToSolutionAsync('Dev Guide');
        await testManager.tool.categoryTab.clickByTextAsync('Controls');
        await testManager.tool.controlList.clickByTextAsync('data-table');
    });

    testManager.testSuite.it('should be able to handle tab key between header and content and use keyboard to operate header', async () => {
        await testManager.tool.dataTable.waitForDataLoadedAsync();
        await testManager.tool.dataTable.selectItemByIndexAsync(0);

        // Move the focus to header.
        await Utils.sendKeyToActiveElement(Utils.Key.chord(Utils.Key.SHIFT, Utils.Key.TAB));
        // Move the focus to the first header cell.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_RIGHT);

        // Press enter to sort by the first column in asc.
        await Utils.sendKeyToActiveElement(Utils.Key.ENTER);

        await testManager.tool.dataTable.selectItemByIndexAsync(0);
        let cellText = await testManager.tool.dataTable.getCellTextInSelectedItemAsync('String Field 1');
        expect(cellText).toEqual('Field 1 0');

        // Move the focus to header.
        await Utils.sendKeyToActiveElement(Utils.Key.chord(Utils.Key.SHIFT, Utils.Key.TAB));
        // Move the focus to the first header cell.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_RIGHT);

        // Press enter to sort by the first column in desc.
        await Utils.sendKeyToActiveElement(Utils.Key.ENTER);
        await testManager.tool.dataTable.selectItemByIndexAsync(0);
        cellText = await testManager.tool.dataTable.getCellTextInSelectedItemAsync('String Field 1');
        expect(cellText).toEqual('Field 1 999');
    });

    testManager.testSuite.it('should stay in the column which has the focus element when the user uses keyboard to move up and down in the rows', async () => {
        await testManager.tool.dataTable.waitForDataLoadedAsync();
        await testManager.tool.dataTable.selectItemByIndexAsync(0);

        // Press right arrow key to move the focus to the link element.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_RIGHT);
        let activeElement = await Utils.getActiveElement();
        expect(await Utils.getTextAsync(activeElement)).toEqual('Link');

        // Press down arrow key to move to the next row and make sure the link in the next row is still focused.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
        activeElement = await Utils.getActiveElement();
        expect(await Utils.getTextAsync(activeElement)).toEqual('Link');

        // Press right arrow key to move the focus to the button element.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_RIGHT);
        activeElement = await Utils.getActiveElement();
        expect(await Utils.getTextAsync(activeElement)).toEqual('I\'m a button. I need focus.');

        // Press up arrow key to move to the previous row and make sure the button in the previous row is still focused.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_UP);
        activeElement = await Utils.getActiveElement();
        expect(await Utils.getTextAsync(activeElement)).toEqual('I\'m a button. I need focus.');
    });

    testManager.testSuite.it('should be able to navigate to different rows', async () => {
        await testManager.tool.dataTable.waitForDataLoadedAsync();
        await testManager.tool.dataTable.selectItemByIndexAsync(0);

        let currentRowIndex: number;

        // Press page down key twice to move to a row much down below the first row.
        await Utils.sendKeyToActiveElement(Utils.Key.PAGE_DOWN);
        await Utils.sendKeyToActiveElement(Utils.Key.PAGE_DOWN);
        await Utils.waitAsync(async () => {
            let rowIndex = await getCurrentRowIndex();
            Utils.log('rowIndex: ' + rowIndex);
            currentRowIndex = rowIndex;
            return rowIndex > 0;
        }, 'Verify the row is selected correctly by pressing page down key');

        // Press down arrow key 10 times to move to next row by 10 rows.
        for (let i = 0; i < 10; i++) {
            await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
        }
        await Utils.waitAsync(async () => {
            let rowIndex = await getCurrentRowIndex();
            Utils.log('rowIndex: ' + rowIndex);
            return rowIndex === currentRowIndex + 10;
        }, 'Verify the row is selected correctly by pressing down key');
        currentRowIndex += 10;

        // Press page up key to move to a row much up above the current row.
        await Utils.sendKeyToActiveElement(Utils.Key.PAGE_UP);
        await Utils.waitAsync(async () => {
            let rowIndex = await getCurrentRowIndex();
            Utils.log('rowIndex: ' + rowIndex);
            if (rowIndex < currentRowIndex) {
                currentRowIndex = rowIndex;
                return true;
            }
            return false;
        }, 'Verify the row is selected correctly by pressing page up key');

        // Press up arrow key 10 times to move to a previous row by 10 rows.
        for (let i = 0; i < 10; i++) {
            await Utils.sendKeyToActiveElement(Utils.Key.ARROW_UP);
        }
        await Utils.waitAsync(async () => {
            let rowIndex = await getCurrentRowIndex();
            Utils.log('rowIndex: ' + rowIndex);
            return rowIndex === currentRowIndex - 10;
        }, 'Verify the row is selected correctly by pressing up key');
        currentRowIndex -= 10;

        let rowCount = await testManager.tool.dataTable.getTotalRowCountAsync();

        // selectedItemLabel is used to make sure when we use keyboard to change data table selection, 
        // the selection binding data will also be updated.
        let selectedItemLabel = testManager.tool.getChildUIObject({ name: 'Selected Item Text', selector: '.selected-items-1' });

        // Press end key to move to the last row.
        await Utils.sendKeyToActiveElement(Utils.Key.END);
        await Utils.waitAsync(async () => {
            let rowIndex = await getCurrentRowIndex();
            Utils.log('rowIndex: ' + rowIndex);
            return rowIndex === rowCount - 1;
        }, 'Verify the row is selected correctly by pressing end key');
        expect(await selectedItemLabel.getTextAsync()).toEqual('Field 1 ' + (rowCount - 1));

        // Press end key to move to the first row.
        await Utils.sendKeyToActiveElement(Utils.Key.HOME);
        await Utils.waitAsync(async () => {
            let rowIndex = await getCurrentRowIndex();
            Utils.log('rowIndex: ' + rowIndex);
            return rowIndex === 0;
        }, 'Verify the row is selected correctly by pressing home key');
        expect(await selectedItemLabel.getTextAsync()).toEqual('Field 1 0');
    });

    testManager.testSuite.it('should be able to handle multiple selection', async () => {
        await testManager.tool.tabInControlDemoUI.clickByTextAsync('Multiple Selection');
        await testManager.tool.dataTable.waitForDataLoadedAsync();
        await testManager.tool.dataTable.selectItemByIndexAsync(0);

        // selectedItemLabel is used to make sure when we use keyboard to change data table selection, 
        // the selection binding data will also be updated.
        let selectedItemLabel = testManager.tool.getChildUIObject({ name: 'Selected Item Text', selector: '.selected-items-2' });
        expect(await selectedItemLabel.getTextAsync()).toBe('Field 1 0');

        // Press space key to uncheck the current item.
        await Utils.sendKeyToActiveElement(Utils.Key.SPACE);
        expect(await selectedItemLabel.getTextAsync()).toBe('');

        // Press down key to move to next item, no item should be selected.
        await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
        expect(await selectedItemLabel.getTextAsync()).toBe('');

        for (let i = 0; i < 3; i++) {
            // Press down key to move to next item and press space key to check the item.
            await Utils.sendKeyToActiveElement(Utils.Key.ARROW_DOWN);
            await Utils.sendKeyToActiveElement(Utils.Key.SPACE);
        }

        expect(await selectedItemLabel.getTextAsync()).toBe('Field 1 2 Field 1 3 Field 1 4');
    });
}, ['servers']);

async function getCurrentRowIndex(): Promise<number> {
    let selectedItemWebElement = await testManager.tool.dataTable.getSelectedItemAsync();
    return parseInt(await Utils.getAttributeAsync(selectedItemWebElement, 'aria-rowindex'), 0);
}
