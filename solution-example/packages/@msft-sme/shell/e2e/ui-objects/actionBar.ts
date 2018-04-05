import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class ActionBar extends UIObject {
    protected selector = this.selector || 'sme-action-bar';

    public moreButton: UIObject = new UIObject(this, { selector: '.action-bar-ellipsis' });
    public dropDownMenu: UIObject = new UIObject(this, { selector: '.tray-actions-container' });

    public async clickActionButtonAsync(buttonName: string): Promise<void> {
        this.logActionStart('clickActionButton', buttonName);
        await Utils.retryAsync(
            async () => {
                let button = await this.findElementAsync('sme-dynamic-action-item button', buttonName);
                let isButtonVisible = button && (await Utils.isVisibleAsync(button));
                if (!isButtonVisible) {
                    await this.moreButton.clickAsync();
                    await this.dropDownMenu.waitForVisibleAsync();
                    button = await this.dropDownMenu.findElementAsync('sme-dynamic-action-item button', buttonName);
                }
                if (!button) {
                    fail('Failed to find the action button. Name: ' + buttonName);
                } else {
                    let buttonText = await Utils.getTextAsync(button);
                    await Utils.log('Found button: ' + buttonText);

                    await Utils.clickAsync(button);
                }
            },
            'Try to click button:' + buttonName);
        this.logActionEnd('clickActionButton');
    }
}