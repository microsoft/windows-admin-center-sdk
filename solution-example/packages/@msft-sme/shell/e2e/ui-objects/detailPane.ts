import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class DetailPane extends UIObject {
  protected selector = this.selector || 'sme-details';

  public toggle: UIObject = new UIObject(this, { name: 'toggle', selector: '.header button' });
  public title: UIObject = new UIObject(this, { name: 'title', selector: '.header h5' });

  public async getDetailByLabelAsync(labelText: string): Promise<string> {
    this.logActionStart('getDetailByLabel', labelText);
    let detail = '';

    let detailLabel = await this.findElementAsync('.content label', labelText);
    let detailItemContainer = await Utils.findParentElementAsync(detailLabel, '', 'div');
    let detailContent = await Utils.findElementAsync('div', null, detailItemContainer);
    detail = await Utils.getTextAsync(detailContent);

    this.logActionEnd('getDetailByLabel', detail);
    return detail;
  }
}