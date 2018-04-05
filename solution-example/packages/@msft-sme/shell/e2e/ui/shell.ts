import { WebElement } from 'selenium-webdriver';
import { TestManager } from '../testManager';
import { DataTable } from '../ui-objects/dataTable';
import { UIObject } from '../ui-objects/uiObject';
import { Utils } from '../utils';
import { BaseUI } from './baseUI';

export class Shell extends BaseUI {
  public toolListToggle = new UIObject(this, { name: 'tool list toggle', selector: 'sme-multi-tool-component .tools-nav-title button' });
  public searchBox: UIObject = new UIObject(this, { name: 'search box', selector: '.searchbox input' });
  public connectionList: DataTable = new DataTable(this, { name: 'connection list', selector: 'sme-connections-list' });
  public toolList: UIObject = new UIObject(this, { name: 'tool list', selector: 'sme-multi-tool-component' });

  public async waitForReadyAsync(): Promise<void> {
    this.logActionStart('waitForReady');
    await this.connectionList.waitForReadyAsync();
    this.logActionEnd('waitForReady');
  }

  public async goToConnectionAsync(connectionName: string): Promise<void> {
    this.logActionStart('goToConnectionAsync', connectionName);
    await this.searchAsync(connectionName);

    let item = await this.dataTable.getItemByCellTextAsync('Name', connectionName);
    if (!item) {
      await this.actionBar.clickActionButtonAsync('Add');
      await this.actionPane.clickByTextAsync('Add Server Connection');
      await this.switchToAddConnectionIFrameAsync();
      await TestManager.currentInstance.addConnection.waitForReadyAsync();
      let textBox = TestManager.currentInstance.addConnection
        .getChildUIObject({ name: 'Connection Name textbox', selector: 'input[name="connectionName"]' });
      await textBox.sendKeysAsync(connectionName);

      let successStatus = TestManager.currentInstance.addConnection
        .getChildUIObject({ name: 'Success status', selector: '.status-container .color-success' });
      await successStatus.waitForVisibleAsync();

      let submitButton = await TestManager.currentInstance.addConnection.findElementAsync('.btn-primary', 'Submit');
      await Utils.clickAsync(submitButton);
    }

    await Utils.waitAsync(
      async (): Promise<boolean> => {
        let status = await this.connectionList.getCellTextInSelectedItemAsync('Status');
        return status === 'Online' || status === 'Credentials Needed';
      },
      'Wait for the connection to be online');
    await this.connectionList.openItemAsync(connectionName);
    if (await this.actionPane.isVisibleAsync()) {
      let useAnotherAccountRadioButton = this.actionPane.getChildUIObject({
        name: '"Use another account" radio button',
        selector: '.radio',
        text: 'Use another account for this connection'
      });
      await useAnotherAccountRadioButton.waitForVisibleAsync();
      if (await useAnotherAccountRadioButton.isVisibleAsync()) {
        await useAnotherAccountRadioButton.clickAsync();
        let userNameTextBox = this.form.getTextboxByLabel('Username');
        await userNameTextBox.sendKeysAsync('redmond\\laynel');
        let passwordTextBox = this.form.getTextboxByLabel('Password');
        await passwordTextBox.sendKeysAsync(''); // TBD: need to use a service account otherwise this code won't work.
        await this.actionPane.primaryButton.clickAsync();
      }
    }
    await this.toolList.waitForVisibleAsync();
    this.logActionEnd('goToConnectionAsync');
  }

  public async goToToolAsync(name: string): Promise<void> {
    this.logActionStart('goToToolAsync', name);

    let toolItemWebElement = await this.getToolMenuItemWebElementByName(name);
    await Utils.clickAsync(toolItemWebElement);

    await Utils.waitAsync(async () => {
      toolItemWebElement = await this.getToolMenuItemWebElementByName(name);
      let isActive = (await Utils.getAttributeAsync(toolItemWebElement, 'className')).indexOf('active') !== -1;
      return isActive;
    },                    'Wait for the tool menu item is actually clicked.');
    this.logActionEnd('goToToolAsync');
  }

  public async switchToAddConnectionIFrameAsync(): Promise<void> {
    this.logActionStart('switchToAddConnectionIFrameAsync');
    await Utils.retryAsync(async () => {
      let webElement = await this.findElementAsync('sme-add-connection-frame iframe', null);
      await Utils.switchToFrameAsync(webElement);
    });
    this.logActionEnd('switchToAddConnectionIFrameAsync');
  }

  public async switchToToolIFrameAsync(toolName?: string): Promise<void> {
    this.logActionStart('switchToToolIFrame', toolName);
    await Utils.retryAsync(async () => {
      let webElement = await this.findElementAsync('iframe', null, async (currentWebElement: WebElement): Promise<boolean> => {
        let src = await currentWebElement.getAttribute('src');
        let className = await currentWebElement.getAttribute('className');
        return className.trim() === 'display-block-frame' && (!toolName || src.indexOf(toolName) !== -1);
      });
      await Utils.switchToFrameAsync(webElement);
    });
    this.logActionEnd('switchToToolIFrame');
  }

  public async switchToTopFrameAsync(): Promise<void> {
    this.logActionStart('switchToTopFrame');
    await Utils.switchToTopFrameAsync();
    this.logActionEnd('switchToTopFrame');
  }

  private async getToolMenuItemWebElementByName(name: string): Promise<WebElement> {
    let toolItemWebElement = await this.toolList.findElementAsync('a', null, async webElement => {
      let text = await Utils.getTextAsync(webElement);
      text = text.replace(' (side loaded)', '');
      return name === text;
    });

    return toolItemWebElement;
  }
}