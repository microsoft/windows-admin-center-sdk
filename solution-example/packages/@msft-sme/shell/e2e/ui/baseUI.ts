import { WebElement } from 'selenium-webdriver';
import { ActionBar } from '../ui-objects/actionBar';
import { ActionPane } from '../ui-objects/actionPane';
import { AlertBar } from '../ui-objects/alertBar';
import { ConfirmationDialog } from '../ui-objects/confirmationDialog';
import { DetailPane } from '../ui-objects/detailPane';
import { FileUploader } from '../ui-objects/fileUploader';
import { Form } from '../ui-objects/form';
import { DataTable } from '../ui-objects/dataTable';
import { ListView } from '../ui-objects/listView';
import { TreeView } from '../ui-objects/treeView';
import { UIObject } from '../ui-objects/uiObject';
import { Utils } from '../utils';

export class BaseUI extends UIObject {
  protected selector = 'sme-root';

  public searchBox: UIObject = new UIObject(this, { name: 'search box', selector: '.searchbox input' });
  public listView: ListView = new ListView(this);
  public dataTable: DataTable = new DataTable(this);
  public treeView: TreeView = new TreeView(this);
  public actionBar: ActionBar = new ActionBar(this);
  public actionPane: ActionPane = new ActionPane(this);
  public confirmationDialog: ConfirmationDialog = new ConfirmationDialog(this);
  public alertBar: AlertBar = new AlertBar(this);
  public detailPane: DetailPane = new DetailPane(this);
  public fileUploader: FileUploader = new FileUploader(this);
  public form: Form = new Form(this);
  public navigationTabs: UIObject = new UIObject(this, { name: 'navigation tabs', selector: '.nav-tabs' });
  public navigation: UIObject = new UIObject(this, { name: 'navigation', selector: 'nav' });

  constructor(name: string, parentUIObject?: UIObject, customSelectorHandler?: (webElement: WebElement) => Promise<boolean>) {
    super(parentUIObject, { name: name, customSelectorHandler: customSelectorHandler });
  }

  public async waitForReadyAsync(): Promise<void> {
    this.logActionStart('waitForReady');
    let webElement = await this.findElementAsync('sme-loading-wheel');
    await Utils.waitForNotVisibleAsync(webElement);
    this.logActionEnd('waitForReady');
  }

  public async searchAsync(keyword: string): Promise<void> {
    this.logActionStart('search', keyword);
    await this.searchBox.sendKeysAsync(keyword);
    this.logActionEnd('search');
  }

  public async cleanSearchAsync(): Promise<void> {
    this.logActionStart('cleanSearch');
    let searchBox = await this.searchBox.getCurrentElementAsync();
    await searchBox.clear();
    this.logActionEnd('cleanSearch');
  }

  public async searchAndSelectAsync(keyword: string): Promise<void> {
    this.logActionStart('searchAndSelect', keyword);
    await this.searchBox.sendKeysAsync(keyword);
    await Utils.sleepAsync(2000);
    if (await this.dataTable.isVisibleAsync()) {
      await this.dataTable.selectItemByCellTextAsync('Name', keyword);
    } else {
      await this.listView.selectItemByCellTextAsync('Name', keyword);
    }
    this.logActionEnd('searchAndSelect');
  }
}