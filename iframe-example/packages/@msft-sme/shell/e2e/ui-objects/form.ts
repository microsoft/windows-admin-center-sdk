import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class Form extends UIObject {
  protected selector = this.selector || 'form';

  public getTextboxByLabel(labelText: string): UIObject {
    return this.getChildUIObject({
      name: 'textbox for ' + labelText, selector: 'input', customSelectorHandler: async (webElement: WebElement) => {
        let formGroup = await Utils.findParentElementAsync(webElement);
        let label = await Utils.findElementAsync('label', labelText, formGroup);
        return !!label;        
      }
    });
  }
}