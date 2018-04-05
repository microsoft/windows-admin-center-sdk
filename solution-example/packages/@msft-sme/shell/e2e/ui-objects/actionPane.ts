import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class ActionPane extends UIObject {
  protected selector = this.selector || '.pane';
  public primaryButton: UIObject = new UIObject(this, { selector: '.btn-primary' });
  public secondaryButton: UIObject = new UIObject(this);
}