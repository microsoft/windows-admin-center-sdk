import { By, WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class DataTable extends UIObject {
  protected selector = this.selector || 'sme-data-table';

  public async openItemAsync(itemName: string): Promise<void> {
    itemName = itemName.toLowerCase();
    this.logActionStart('openItemAsync', itemName);

    let selectedItem: WebElement = null;
    await Utils.retryAsync(async () => {
      let currentWebElement = await this.getCurrentElementAsync();
      await Utils.waitForVisibleAsync(currentWebElement);
      let items = await Utils.findElementsAsync('div.content tr.item', '', currentWebElement);
      for (let i = 0; i < items.length; i++) {
        let text = await Utils.getTextAsync(items[i]);
        if (text.toLowerCase().indexOf(itemName) === 0) {
          selectedItem = items[i];
          break;
        }
      }

      if (selectedItem) {
        await Utils.waitForVisibleAsync(selectedItem);
        let link = await Utils.findElementAsync('a', null, selectedItem);
        await Utils.clickAsync(link);
      }
    }, 'openItemAsync: ' + itemName);

    this.logActionEnd('openItemAsync', selectedItem);
  }

  public async waitForDataLoadedAsync(): Promise<void> {
    this.logActionStart('waitForDataLoadedAsync');

    await this.waitForReadyAsync();
    let loadingText = this.getChildUIObject({ name: 'Loading Text', selector: '.content .item.no-data' });
    await Utils.waitAsync(async () => {
      let visible = await loadingText.isVisibleAsync();
      return !visible;
    }, 'Wait for loading text to disappear');

    this.logActionEnd('waitForDataLoadedAsync');
  }

  public async getTotalRowCountAsync(): Promise<number> {
    this.logActionStart('getTotalRowCountAsync');

    let count: number;
    let headerTable = this.getChildUIObject({ name: 'header table', selector: '.header table' });
    let countAttributeValue = await headerTable.getAttributeAsync('aria-rowcount');
    count = parseInt(countAttributeValue, 0);

    this.logActionEnd('getTotalRowCountAsync', count);
    return count;
  }

  public async getItemsAsync(): Promise<WebElement[]> {
    this.logActionStart('getItemsAsync');

    let items: WebElement[] = null;

    await Utils.retryAsync(async () => {
      let scrollDataTables = await this.findElementsAsync('.scroll-data');
      let scrollDataTable = scrollDataTables[scrollDataTables.length - 1];
      items = await Utils.findElementsAsync('div.content tr.item.data', null, scrollDataTable);

      if (items.length === 1) {
        let isEmptyMessageItem = await Utils.findElementAsync('.item.no-data', null, items[0]);
        if (isEmptyMessageItem) {
          items = [];
        }
      }
    }, 'getItemsAsync');
    this.logActionEnd('getItemsAsync', items.length);
    return items;
  }

  public async scrollContentList(position: number): Promise<void> {
    this.logActionStart('scrollContentList', position);

    let dataTableScrollContainerWebElement = await this.findElementAsync('.scroll-container');
    await Utils.executeScript('arguments[0].scrollTop=' + position, dataTableScrollContainerWebElement);

    this.logActionEnd('scrollContentList', position);
  }

  public async getCellTextInAllItemsAsync(columnName: string): Promise<string[]> {
    this.logActionStart('getCellTextInAllItemsAsync', columnName);

    let result: string[] = [];

    let dataTableScrollContainerWebElement = await this.findElementAsync('.scroll-container');
    await Utils.executeScript('arguments[0].scrollTop=0', dataTableScrollContainerWebElement);

    let item: WebElement = null;
    await Utils.waitAsync(
      async () => {
        let items = await this.getItemsAsync();
        let columnTexts = await this.getColumnTextsAsync();
        let columnIndex = columnTexts.indexOf(columnName);
        for (let i = 0; i < items.length; i++) {
          let cells = await Utils.findElementsAsync('.sme-table-cell', null, items[i]);
          if (cells && cells.length > 0) {
            if (cells[columnIndex]) {
              let currentCellText = await Utils.getTextAsync(cells[columnIndex]);
              if (result.indexOf(currentCellText) === -1) {
                Utils.log('Found cell text:' + currentCellText);
                result.push(currentCellText);
              }
            }
          } else {
            throw 'Failed to get cells. Item index: ' + i;
          }
        }

        Utils.log('Finish scanning current screen. Scroll down a little bit and continue.');
        let beforeScrollTop = await Utils.getAttributeAsync(dataTableScrollContainerWebElement, 'scrollTop');
        Utils.log('Start scroll');
        await Utils.executeScript('arguments[0].scrollTop+=arguments[0].offsetHeight-30', dataTableScrollContainerWebElement);
        Utils.log('Finish scroll');
        let afterScrollTop = await Utils.getAttributeAsync(dataTableScrollContainerWebElement, 'scrollTop');
        if (beforeScrollTop == afterScrollTop) {
          await Utils.executeScript('arguments[0].scrollTop=0', dataTableScrollContainerWebElement);
          Utils.log('Cannot find the item after scrolling through the whole list. Stop searching.');
          return true;
        }
        await Utils.sleepAsync(1000);

        return false;
      }, 'Wait to process all the items', false, true);

    this.logActionEnd('getCellTextInAllItemsAsync', result.length);
    return result;
  }

  public async selectItemByIndexAsync(index: number): Promise<WebElement> {
    this.logActionStart('selectItemByIndex', index.toString());
    let items: WebElement[] = null;
    await Utils.retryAsync(async () => {
      items = await this.getItemsAsync();
      await Utils.clickAsync(items[index], true);
    });
    this.logActionEnd('selectItemByIndex', items[index]);
    return items[index];
  }

  public async waitItemAppearByCellTextAsync(columnName: string, cellText: string): Promise<void> {
    this.logActionStart('waitItemAppearByCellTextAsync', columnName + ' | ' + cellText);
    await Utils.waitAsync(async () => {
      let result = !!(await this.getItemByCellTextAsync(columnName, cellText));
      return result;
    }, 'Wait for the item by cell text to appear: ' + cellText, false, true);
    this.logActionEnd('waitItemAppearByCellTextAsync');
  }

  public async waitItemDisappearByCellTextAsync(columnName: string, cellText: string): Promise<void> {
    this.logActionStart('waitItemDisappearByCellTextAsync', columnName + ' | ' + cellText);

    cellText = cellText.toLowerCase();
    let dataTableScrollContainerWebElement = await this.findElementAsync('.scroll-container');
    await Utils.executeScript('arguments[0].scrollTop=0', dataTableScrollContainerWebElement);

    await Utils.waitAsync(
      async () => {
        let item: WebElement = null;
        let items = await this.getItemsAsync();
        let columnTexts = await this.getColumnTextsAsync();
        let columnIndex = columnTexts.indexOf(columnName);
        for (let i = 0; i < items.length; i++) {
          let cells = await Utils.findElementsAsync('.sme-table-cell', null, items[i]);
          if (cells && cells.length > 0) {
            if (cells[columnIndex]) {
              let currentCellText = await Utils.getTextAsync(cells[columnIndex]);
              Utils.log('Get cell text: ' + currentCellText);
              if (currentCellText.toLowerCase() === cellText) {
                item = items[i];
                break;
              }
            }
          } else {
            throw 'Failed to get cells. Item index: ' + i;
          }
        }

        if (!item) {
          Utils.log('Cannot find the item in the current screen. Scroll down a little bit and continue.');
          let beforeScrollTop = await Utils.getAttributeAsync(dataTableScrollContainerWebElement, 'scrollTop');
          Utils.log('Start scroll');
          await Utils.executeScript('arguments[0].scrollTop+=arguments[0].offsetHeight-30', dataTableScrollContainerWebElement);
          Utils.log('Finish scroll');
          let afterScrollTop = await Utils.getAttributeAsync(dataTableScrollContainerWebElement, 'scrollTop');
          if (beforeScrollTop == afterScrollTop) {
            return true;
          }
        }

        await Utils.sleepAsync(1000);

        return false;
      }, 'Wait for the item by cell text to disappear: ' + cellText, false, true);

    this.logActionEnd('waitItemDisappearByCellTextAsync');
  }

  public async getItemByCellTextAsync(columnName: string, cellText: string): Promise<WebElement> {
    this.logActionStart('getItemByCellText', columnName + ' | ' + cellText);

    cellText = cellText.toLowerCase();
    let dataTableScrollContainerWebElement = await this.findElementAsync('.scroll-container');
    await Utils.executeScript('arguments[0].scrollTop=0', dataTableScrollContainerWebElement);

    let item: WebElement = null;
    await Utils.waitAsync(
      async () => {
        let items = await this.getItemsAsync();
        let columnTexts = await this.getColumnTextsAsync();
        let columnIndex = columnTexts.indexOf(columnName);
        for (let i = 0; i < items.length; i++) {
          let cells = await Utils.findElementsAsync('.sme-table-cell', null, items[i]);
          if (cells && cells.length > 0) {
            if (cells[columnIndex]) {
              let currentCellText = await Utils.getTextAsync(cells[columnIndex]);
              Utils.log('Get cell text: ' + currentCellText);
              if (currentCellText.toLowerCase() === cellText) {
                item = items[i];
                break;
              }
            }
          } else {
            throw 'Failed to get cells. Item index: ' + i;
          }
        }

        if (!item) {
          Utils.log('Cannot find the item in the current screen. Scroll down a little bit and continue.');
          let beforeScrollTop = await Utils.getAttributeAsync(dataTableScrollContainerWebElement, 'scrollTop');
          Utils.log('Start scroll');
          await Utils.executeScript('arguments[0].scrollTop+=arguments[0].offsetHeight-30', dataTableScrollContainerWebElement);
          Utils.log('Finish scroll');
          let afterScrollTop = await Utils.getAttributeAsync(dataTableScrollContainerWebElement, 'scrollTop');
          if (beforeScrollTop == afterScrollTop) {
            await Utils.executeScript('arguments[0].scrollTop=0', dataTableScrollContainerWebElement);
            Utils.log('Cannot find the item after scrolling through the whole list. Stop searching.');
            return true;
          }
        }

        await Utils.sleepAsync(1000);

        return !!item;
      }, 'Wait to get the item by cell text: ' + cellText, false, true);

    this.logActionEnd('getItemByCellText', item);
    return item;
  }

  public async selectItemByCellTextAsync(columnName: string, cellText: string): Promise<WebElement> {
    this.logActionStart('selectItemByCellText', columnName + ' | ' + cellText);
    let item: WebElement = null;
    await Utils.waitAsync(
      async () => {
        item = await this.getItemByCellTextAsync(columnName, cellText);
        if (item) {
          await Utils.clickAsync(item, true);
        }
        return item !== null;
      },
      'selectItemByCellText', false, true);

    this.logActionEnd('selectItemByCellText', item);
    return item;
  }

  public async getSelectedItemAsync(): Promise<WebElement> {
    this.logActionStart('getSelectedItem');
    let item = await this.findElementAsync('tr.item.selected');
    this.logActionEnd('getSelectedItem', item);
    return item;
  }

  public async getCellTextInSelectedItemAsync(columnName: string): Promise<string> {
    this.logActionStart('getCellTextInSelectedItem', columnName);

    let cellText = '';
    await Utils.retryAsync(async () => {
      let item = await this.getSelectedItemAsync();
      let columnTexts = await this.getColumnTextsAsync();
      let columnIndex = columnTexts.indexOf(columnName);
      let cells = await Utils.findElementsAsync('.sme-table-cell', null, item);
      cellText = await Utils.getTextAsync(cells[columnIndex]);
    }, 'getCellTextInSelectedItem:' + columnName);

    this.logActionEnd('getCellTextInSelectedItem', cellText);
    return cellText;
  }

  public async getColumnTextsAsync(): Promise<string[]> {
    this.logActionStart('getColumnTextsAsync');
    let columnTexts: string[] = [];

    await Utils.retryAsync(async () => {
      let columns = await this.findElementsAsync('div.header th');
      for (let i = 0; i < columns.length; i++) {
        columnTexts.push(await Utils.getTextAsync(columns[i]));
      }
    }, 'getColumnTextsAsync');

    this.logActionEnd('getColumnTextsAsync');
    return columnTexts;
  }
}