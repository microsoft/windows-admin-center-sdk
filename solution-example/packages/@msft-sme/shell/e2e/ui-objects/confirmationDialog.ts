import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class ConfirmationDialog extends UIObject {
  protected selector = this.selector || 'sme-confirmation-list-dialog';

  public yesButton: UIObject = new UIObject(this, { name: 'Yes Button', selector: '.modal-footer button.btn-primary' });
  public noButton: UIObject = new UIObject(this, {
    name: 'No Button', 
    selector: '.modal-footer button.btn', 
    customSelectorHandler: async (webElement: WebElement) => {
      let cssClass = await Utils.getAttributeAsync(webElement, 'className');
      return cssClass.indexOf('btn-primary') === -1;
    }
  });
}