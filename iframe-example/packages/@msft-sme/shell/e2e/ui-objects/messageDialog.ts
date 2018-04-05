import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class MessageDialog extends UIObject {
  protected selector = this.selector || 'sme-message-dialog';
  public header: UIObject = new UIObject(this, { name: 'Header', selector: 'sme-dialog-header' });
  public okButton: UIObject = new UIObject(this, { name: 'OK Button', selector: 'sme-dialog-footer button' });
}