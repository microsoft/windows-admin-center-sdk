import { WebElement } from 'selenium-webdriver';
import { ConnectionType, TestManager } from '../testManager';
import { DataTable } from '../ui-objects/dataTable';
import { UIObject } from '../ui-objects/uiObject';
import { Utils } from '../utils';
import { Shell } from './shell';
import { Settings } from '../Settings';

export class DevGuide extends Shell {
  public categoryTab = new UIObject(this, { name: 'Category Tab', selector: 'sme-dev-guide sme-pivot' });
  public controlList = new UIObject(this, { name: 'Control List', selector: 'sme-ng2-controls nav' });
  public tabInControlDemoUI = new UIObject(this, { name: 'Tab in Control Demo UI', selector: 'sme-ng2-controls .nav-tabs' });
}