import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class ConfirmationDialog extends UIObject {
  protected selector = this.selector || 'sme-confirmation-list-dialog';

  public yesButton: UIObject = new UIObject(this, { name: 'Yes Button', selector: 'sme-dialog-footer button.sme-button-primary' });
  public noButton: UIObject = new UIObject(this, {
    name: 'No Button', 
    selector: 'sme-dialog-footer button', 
    customSelectorHandler: async (webElement: WebElement) => {
      let cssClass = await Utils.getAttributeAsync(webElement, 'className');
      return cssClass.indexOf('sme-button-primary') === -1;
    }
  });
}