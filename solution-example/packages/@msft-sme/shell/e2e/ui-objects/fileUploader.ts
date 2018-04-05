import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class FileUploader extends UIObject {
  protected selector = this.selector || 'input.input-file';

  public async uploadFileAsync(fileName: string): Promise<void> {
    this.logActionStart('uploadFileAsync', fileName);
    let fileUploaderElement = await this.getCurrentElementAsync();
    // Need to make the native file uploader control visible to do automation of file choosing on it.
    await Utils.executeScript(
      'arguments[0].setAttribute("style","position:static;width:100px;height:20px;opacity:100")', 
      fileUploaderElement);
    await Utils.sendKeysAsync(fileUploaderElement, fileName, true);
    this.logActionEnd('uploadFileAsync');
  }
}