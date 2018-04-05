import { WebElement } from 'selenium-webdriver';
import { ConnectionType, TestManager } from '../testManager';
import { DataTable } from '../ui-objects/dataTable';
import { UIObject } from '../ui-objects/uiObject';
import { Utils } from '../utils';
import { BaseUI } from './baseUI';
import { Settings } from '../Settings';

export class Shell extends BaseUI {
  public toolListToggle = new UIObject(this, { name: 'tool list toggle', selector: 'sme-multi-tool-component .tools-nav-title button' });
  public searchBox = new UIObject(this, { name: 'search box', selector: '.searchbox input' });
  public connectionList = new DataTable(this, { name: 'connection list', selector: 'sme-connections-list' });
  public toolList = new UIObject(this, { name: 'tool list', selector: 'sme-multi-tool-component' });
  public applicationLogo = new UIObject(this, { name: 'Application Logo', selector: 'sme-app-bar a.sme-button' });
  
  public async waitForReadyAsync(): Promise<void> {
    this.logActionStart('waitForReady');
    await this.connectionList.waitForReadyAsync();
    this.logActionEnd('waitForReady');
  }

  public async goToConnectionAsync(connectionName: string, connectionType = ConnectionType.Server,
    userName?: string, password?: string): Promise<void> {
    this.logActionStart('goToConnectionAsync', connectionName);
    await this.searchAsync(connectionName);

    if (Settings.connectionType) {
      connectionType = Settings.connectionType;
    }

    let item = await this.dataTable.getItemByCellTextAsync('Name', connectionName);
    if (!item) {
      await this.actionBar.clickActionButtonAsync('Add');

      let addConnectionButtonText = '';
      switch (connectionType) {
        case ConnectionType.Server:
          addConnectionButtonText = 'Add Server Connection';
          break;
        case ConnectionType.WindowsClient:
          addConnectionButtonText = 'Add Windows PC Connection';
          break;
        case ConnectionType.FailoverCluster:
          addConnectionButtonText = 'Add Failover Cluster Connection';
          break;
        case ConnectionType.HyperConvergedCluster:
          addConnectionButtonText = 'Add Hyper-Converged Cluster Connection';
          break;
      }

      await this.actionPane.clickByTextAsync(addConnectionButtonText);
      await this.switchToAddConnectionIFrameAsync();
      await TestManager.currentInstance.addConnection.waitForReadyAsync();
      let textBox = TestManager.currentInstance.addConnection
        .getChildUIObject({ name: 'Connection Name textbox', selector: 'input[name="connectionName"]' });
      await textBox.sendKeysAsync(connectionName);

      await TestManager.currentInstance.addConnection.waitForReadyAsync();

      let submitButton = await TestManager.currentInstance.addConnection.findElementAsync('button', 'Submit');
      await Utils.clickAsync(submitButton);
    }

    let columns = await this.connectionList.getColumnTextsAsync();
    if (columns.indexOf('Status') !== -1) {
      await Utils.waitAsync(
        async (): Promise<boolean> => {
          let status = await this.connectionList.getCellTextInSelectedItemAsync('Status');
          return status === 'Online' || status === 'Credentials Needed';
        },
        'Wait for the connection to be online');
    }
    await this.connectionList.openItemAsync(connectionName);

    await Utils.waitAsync(async () => {
      if (!userName && !password) {
        if (await this.actionPane.isVisibleAsync()) {
          fail('Should not see the credential dialog.');
        }
      } else {
        await this.actionPane.waitForVisibleAsync();
        let useAnotherAccountRadioButton = this.actionPane.getChildUIObject({
          name: '"Use another account" radio button',
          selector: '.radio',
          text: 'Use another account for this connection'
        });
        await useAnotherAccountRadioButton.waitForVisibleAsync();
        if (await useAnotherAccountRadioButton.isVisibleAsync()) {
          await useAnotherAccountRadioButton.clickAsync();
          let userNameTextBox = this.form.getTextboxByLabel('Username');
          await userNameTextBox.sendKeysAsync(userName);
          let passwordTextBox = this.form.getTextboxByLabel('Password');
          await passwordTextBox.sendKeysAsync(password);
          let applyToAll = this.form.getChildUIObject({ name: 'Apply To All checkbox', selector: 'input[name="applyToAll"]' });
          await applyToAll.clickAsync();

          await this.actionPane.primaryButton.clickAsync();
        }
      }

      let isToolListVisible = await this.toolList.isVisibleAsync();

      let hasConnectionError = false;
      try {
        hasConnectionError = await this.messageDialog.isVisibleAsync()
          && (await this.messageDialog.header.getTextAsync()) === 'Connection Error';
      } catch (e) {
        Utils.log('Error in connection error detecting: ' + e);
      }
      if (hasConnectionError) {
        throw 'Connection Error';
      }

      return isToolListVisible;
    }, 'Wait for connecting.');
    this.logActionEnd('goToConnectionAsync');
  }

  public async goToToolAsync(name: string): Promise<void> {
    this.logActionStart('goToToolAsync', name);

    let toolItemWebElement: WebElement;
    
    await Utils.waitAsync(async () => {
      toolItemWebElement = await this.getToolMenuItemWebElementByName(name);
      if (toolItemWebElement) {
        await Utils.clickAsync(toolItemWebElement);
        return true;
      }
      return false;
    }, 'Wait for the tool item to be clicked.');

    await Utils.waitAsync(async () => {
      toolItemWebElement = await this.getToolMenuItemWebElementByName(name);
      let isActive = (await Utils.getAttributeAsync(toolItemWebElement, 'className')).indexOf('active') !== -1;
      return isActive;
    }, 'Wait for the tool menu item is actually clicked.');
    this.logActionEnd('goToToolAsync');
  }

  public async switchToAddConnectionIFrameAsync(): Promise<void> {
    this.logActionStart('switchToAddConnectionIFrameAsync');
    await Utils.retryAsync(async () => {
      await Utils.switchToTopFrameAsync();
      let webElement = await this.findElementAsync('sme-add-connection-frame iframe', null);
      await Utils.switchToFrameAsync(webElement);
    });
    this.logActionEnd('switchToAddConnectionIFrameAsync');
  }

  public async switchToToolIFrameAsync(toolName?: string): Promise<void> {
    this.logActionStart('switchToToolIFrame', toolName);
    await Utils.retryAsync(async () => {
      await Utils.switchToTopFrameAsync();

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

  public async goToHomeScreenAsync(): Promise<void> {
    this.logActionStart('goToHomeScreenAsync');
    await this.switchToTopFrameAsync();
    await Utils.navigateToUrl(TestManager.currentInstance.getTestURL());
    await this.searchBox.waitForVisibleAsync();
    this.logActionEnd('goToHomeScreenAsync');
  }

  private async getToolMenuItemWebElementByName(name: string): Promise<WebElement> {
    let toolItemWebElement = await this.toolList.findElementAsync('a', null, async webElement => {
      let text = await Utils.getTextAsync(webElement);
      text = text.replace(' (side loaded)', '');
      return name === text;
    });

    return toolItemWebElement;
  }

  public async goToSolutionAsync(solutionName:string):Promise<void>{
    this.logActionStart('goToSolutionAsync', solutionName);

    let solutionDropDownButton=this.getChildUIObject({name:'Solution dropdown button', selector: 'sme-app-bar sme-dropdown button'});
    await solutionDropDownButton.clickAsync();
    let solutionList=this.getChildUIObject({name:'Solution list', selector: 'sme-app-bar sme-solutions-list'});
    await solutionList.clickByTextAsync(solutionName);

    this.logActionEnd('goToSolutionAsync');
  }
}