import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class AlertBar extends UIObject {
  protected selector = this.selector || 'sme-alert-bar';

  public async getAlertsAsync(): Promise<WebElement[]> {
    this.logActionStart('getAlertsAsync');
    let webElements = await this.findElementsAsync('.growl-item');
    this.logActionEnd('getAlertsAsync', webElements.length);
    return webElements;
  }

  public async waitForAlertByTextAsync(text: string): Promise<void> {
    this.logActionStart('waitForAlertByText', text);
    await this.waitForAlertByTextFilterHandlerImplementationAsync(
      (alertText: string): boolean => {
        return text === alertText;
      },
      'Wait for text: ' + text);

    this.logActionEnd('waitForAlertByText');
  }

  public async waitForAlertByTextFilterHandlerAsync(textFilterHandler: (text: string) => boolean,
    description: string): Promise<void> {
    this.logActionStart('waitForAlertByText', description);
    await this.waitForAlertByTextFilterHandlerImplementationAsync(textFilterHandler, description);
    this.logActionEnd('waitForAlertByText');
  }

  public async closeAllAlertsAsync(): Promise<void> {
    this.logActionStart('closeAllAlerts');
    let alerts = await this.getAlertsAsync();
    for (let i = 0; i < alerts.length; i++) {
      let closeButtonElement = await Utils.findElementAsync('button.icon-win-cancel', null, alerts[i]);
      await closeButtonElement.click();
    }
    this.logActionEnd('closeAllAlerts', alerts.length.toString());
  }

  private async waitForAlertByTextFilterHandlerImplementationAsync(textFilterHandler: (text: string) => boolean,
    description: string): Promise<void> {
    await Utils.waitAsync(
      async (): Promise<boolean> => {
        let alerts = await this.getAlertsAsync();
        for (let i = 0; i < alerts.length; i++) {
          let currentText = await Utils.getTextAsync(alerts[i]);
          if (textFilterHandler(currentText)) {
            return true;
          }
        }
        return false;
      },
      'waitForAlertByText|' + description);
    await this.closeAllAlertsAsync();
  }
}