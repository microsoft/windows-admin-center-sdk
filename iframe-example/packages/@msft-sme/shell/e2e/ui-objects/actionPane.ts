import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class ActionPane extends UIObject {
  protected selector = this.selector || '.sme-layout-dialog-pane';
  public primaryButton: UIObject = new UIObject(this, { selector: '.btn-primary, .sme-button-primary' });
  public secondaryButton: UIObject = new UIObject(this, {selector: 'sme-dialog-footer button', customSelectorHandler: async webElement => {
    let classNames =await Utils.getAttributeAsync(webElement, 'className');
    return classNames.indexOf('btn-primary') === -1 && classNames.indexOf('sme-button-primary') === -1;
  }});
}
