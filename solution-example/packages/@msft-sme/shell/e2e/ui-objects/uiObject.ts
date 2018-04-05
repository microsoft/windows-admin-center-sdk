import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';

export class UIObject {
  private static logIndent = 0;
  private webElement: WebElement;

  protected name: string;
  protected selector: string;
  protected text: string;
  protected customSelectorHandler?: (webElement: WebElement) => Promise<boolean>;

  constructor(private parentUIObject?: UIObject, parameter?: UIObjectCreationParameter) {
    // If name is specified in parameter object, use it instead of the class name.
    this.name = parameter && parameter.name || this['constructor'].name;
    this.selector = parameter && parameter.selector;
    this.text = parameter && parameter.text;
    this.customSelectorHandler = parameter && parameter.customSelectorHandler;
  }

  public getChildUIObject(parameter: UIObjectCreationParameter) {
    return new UIObject(this, parameter);
  }

  public async waitForReadyAsync(): Promise<void> {
    await this.waitForVisibleAsync();
  }

  public async getCurrentElementAsync(): Promise<WebElement> {
    this.logActionStart('getCurrentElementAsync');
    let webElement: WebElement = null;

    await Utils.retryAsync(
      async (): Promise<void> => {
        let parentElement: WebElement = null;
        if (this.parentUIObject) {
          parentElement = await this.parentUIObject.getCurrentElementAsync();
        }
        if (!this.customSelectorHandler) {
          webElement = await Utils.findElementAsync(this.selector, this.text, parentElement);
        } else {
          let webElements = await Utils.findElementsAsync(this.selector, this.text, parentElement, this.customSelectorHandler);
          webElement = webElements[0];
        }
      },
      this.name + '|getCurrentElementAsync',
      (): boolean => {
        return !webElement;
      });

    this.logActionEnd('getCurrentElementAsync', webElement);
    return webElement;
  }

  public async getTextAsync(): Promise<string> {
    this.logActionStart('getTextAsync');
    let webElement = await this.getCurrentElementAsync();
    let result = await Utils.getTextAsync(webElement);
    this.logActionEnd('getTextAsync', result);
    return result;
  }

  public async findElementAsync(selector: string, text?: string,
    customSelectorHandler?: (webElement: WebElement) => Promise<boolean>): Promise<WebElement> {
    this.logActionStart('findElementAsync', selector + (text ? ' | text: ' + text : ''));
    let webElement = await this.getCurrentElementAsync();
    let result = await Utils.findElementAsync(selector, text, webElement, customSelectorHandler);
    this.logActionEnd('findElementAsync', result);
    return result;
  }

  public async findElementsAsync(selector: string, text?: string,
    customSelectorHandler?: (webElement: WebElement) => Promise<boolean>): Promise<WebElement[]> {
    this.logActionStart('findElementsAsync', selector + (text ? ' | text: ' + text : ''));
    let webElement = await this.getCurrentElementAsync();
    let result = await Utils.findElementsAsync(selector, text, webElement, customSelectorHandler);
    this.logActionEnd('findElementsAsync', result.length);
    return result;
  }

  public async waitForPresentAsync(): Promise<WebElement> {
    this.logActionStart('waitForPresentAsync');

    let webElement: WebElement = null;
    await Utils.waitAsync(
      async (): Promise<boolean> => {
        let currentWebElement = await this.getCurrentElementAsync();
        if (currentWebElement) {
          webElement = currentWebElement;
          return true;
        }
        return false;
      },
      'waitForPresentAsync|' + this.name);
    this.logActionEnd('waitForPresentAsync');
    return webElement;
  }

  public async waitForVisibleAsync(): Promise<void> {
    this.logActionStart('waitForVisibleAsync');
    let webElement = await this.waitForPresentAsync();
    await Utils.waitForVisibleAsync(webElement);
    this.logActionEnd('waitForVisibleAsync');
  }

  public async isVisibleAsync(): Promise<boolean> {
    this.logActionStart('isVisible');
    let webElement = await this.getCurrentElementAsync();
    let result = await Utils.isVisibleAsync(webElement);
    this.logActionEnd('isVisible', result);
    return result;
  }

  public async sendKeysAsync(keys: string): Promise<void> {
    this.logActionStart('sendKeysAsync', keys);
    await Utils.retryAsync(
      async () => {
        let webElement = await this.getCurrentElementAsync();
        await Utils.waitForVisibleAsync(webElement);
        await Utils.sendKeysAsync(webElement, keys);
      },
      'sendKeysAsync');
    this.logActionEnd('sendKeysAsync');
  }

  public async clickAsync(): Promise<void> {
    this.logActionStart('click');
    await Utils.retryAsync(
      async () => {
        let webElement = await this.getCurrentElementAsync();
        await Utils.clickAsync(webElement);
      },
      'clickAsync');
    this.logActionEnd('click');
  }

  public async clickByTextAsync(text: string): Promise<void> {
    this.logActionStart('clickByTextAsync', text);

    await Utils.retryAsync(
      async () => {
        let webElement = await this.getCurrentElementAsync();
        await Utils.clickByTextAsync(webElement, text);
      },
      'clickByTextAsync:' + text);

    this.logActionEnd('clickByTextAsync');
  }

  protected logActionStart(actionName: string, parameter?: any): void {
    Utils.logActionStart(this.name, actionName, parameter);
  }

  protected logActionEnd(actionName: string, result?: any): void {
    Utils.logActionEnd(this.name, actionName, result);
  }
}

export interface UIObjectCreationParameter {
  name?: string;
  selector?: string;
  text?: string;
  customSelectorHandler?: (webElement: WebElement) => Promise<boolean>;
}