import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class DropdownList extends UIObject {
  public async getSelectedTextAsync(): Promise<string> {
    this.logActionStart('getSelectedText');
    let webElement = await this.getCurrentElementAsync();
    let selectedValue = await webElement.getAttribute('value');
    let selectedOption = await this.findElementAsync('option', null, async webElement => {
      let optionValue = await webElement.getAttribute('value');
      return optionValue === selectedValue;
    });

    let text = await Utils.getTextAsync(selectedOption);
    this.logActionEnd('getSelectedText');
    return text;
  }

  public async selectTextAsync(text: string): Promise<void> {
    this.logActionStart('selectText', text);
    let webElement = await this.getCurrentElementAsync();
    await this.waitForVisibleAsync();
    let option = await this.findElementAsync('option', text);
    await Utils.clickAsync(option);
    this.logActionEnd('selectText');
  }
}