import { By, WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class ListView extends UIObject {
  protected selector = this.selector || 'p-datatable';

  public async openItemAsync(itemName: string): Promise<void> {
    this.logActionStart('openItemAsync', itemName);
    let currentWebElement = await this.getCurrentElementAsync();
    await Utils.waitForVisibleAsync(currentWebElement);
    let items = await Utils.findElementsAsync('.ui-cell-data a', '', currentWebElement);
    let selectedItem: WebElement = null;
    for (let i = 0; i < items.length; i++) {
      let text = await Utils.getTextAsync(items[i]);
      if (text.indexOf(itemName) === 0) {
        selectedItem = items[i];
        break;
      }
    }

    if (selectedItem) {
      await Utils.waitForVisibleAsync(selectedItem);
      await Utils.clickAsync(selectedItem);
    }

    this.logActionEnd('openItemAsync', selectedItem);
  }

  public async getItemsAsync(): Promise<WebElement[]> {
    this.logActionStart('getItemsAsync');
    let items = await this.findElementsAsync('.ui-datatable-data tr.ui-widget-content', null);

    if (items.length === 1) {
      let isEmptyMessageItem = await Utils.findElementAsync('.ui-datatable-emptymessage', null, items[0]);
      if (isEmptyMessageItem) {
        items = [];
      }
    }
    this.logActionEnd('getItemsAsync', items.length);
    return items;
  }

  public  async expandGroupHeaderAsync(name:  string):  Promise<void> {
    this.logActionStart('expandGroupHeaderAsync');
    let  groupHeader  =  await  this.findElementAsync('.group-header div',  name);
    await  Utils.clickAsync(groupHeader);
    this.logActionEnd('expandGroupHeaderAsync');
  }

  public async selectItemByIndexAsync(index: number): Promise<WebElement> {
    this.logActionStart('selectItemByIndex', index.toString());
    let items = await this.getItemsAsync();
    await Utils.clickAsync(items[index]);
    this.logActionEnd('selectItemByIndex', items[index]);
    return items[index];
  }

  public async getItemByCellTextAsync(columnName: string, cellText: string): Promise<WebElement> {
    this.logActionStart('getItemByCellText', columnName + ' | ' + cellText);
    let item: WebElement = null;
    await Utils.retryAsync(
      async () => {
        let items = await this.getItemsAsync();
        let columnTexts = await this.getColumnTextsAsync();
        let columnIndex = columnTexts.indexOf(columnName);
        for (let i = 0; i < items.length; i++) {
          let cells = await Utils.findElementsAsync('.ui-cell-data', null, items[i]);
          if (cells && cells.length > 0) {
            let currentCellText = await Utils.getTextAsync(cells[columnIndex]);
            if (currentCellText === cellText) {
              item = items[i];
              break;
            }
          } else {
            throw 'Failed to get cells. Item index: ' + i;
          }
        }
      },
      this.name + '|getItemByCellText|' + columnName + '|' + cellText, (): boolean => {
        return item === null;
      });

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
          await Utils.clickAsync(item);
        }
        return item !== null;
      },
      'selectItemByCellText');

    this.logActionEnd('selectItemByCellText', item);
    return item;
  }

  public async getSelectedItemAsync(): Promise<WebElement> {
    this.logActionStart('getSelectedItem');
    let item = await this.findElementAsync('.ui-widget-content.ui-state-highlight');
    this.logActionEnd('getSelectedItem', item);
    return item;
  }

  public async getCellTextInSelectedItemAsync(columnName: string): Promise<string> {
    this.logActionStart('getCellTextInSelectedItem', columnName);
    let item = await this.getSelectedItemAsync();
    let columnTexts = await this.getColumnTextsAsync();
    let columnIndex = columnTexts.indexOf(columnName);
    let cells = await Utils.findElementsAsync('.ui-cell-data', null, item);
    let cellText = await Utils.getTextAsync(cells[columnIndex]);
    this.logActionEnd('getCellTextInSelectedItem', cellText);
    return cellText;
  }

  public async getColumnTextsAsync(): Promise<string[]> {
    let columns = await this.findElementsAsync('.ui-datatable-thead .ui-column-title');
    let columnTexts: string[] = [];
    for (let i = 0; i < columns.length; i++) {
      columnTexts.push(await Utils.getTextAsync(columns[i]));
    }
    return columnTexts;
  }
}