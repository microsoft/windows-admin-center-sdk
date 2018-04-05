import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class TreeView extends UIObject {
  protected selector = this.selector || 'p-treetable';

  // TODO: FIX THIS.
  // tslint:disable-next-line:function-name
  public async GoToNodeByPathAsync(path: string, startingNode?: WebElement): Promise<WebElement> {
    this.logActionStart('GoToNodeByPathAsync', path);
    let currentNode = startingNode || await this.getCurrentElementAsync();

    let pathSegments = path.split('/');
    for (let i = 0; i < pathSegments.length; i++) {
      this.logActionStart('Handle path segment', pathSegments[i]);
      await Utils.retryAsync(
        async () => {
          currentNode = await Utils.findElementAsync('tbody', null, currentNode, async webElement => {
            if (webElement) {
              let text = await this.getNodeTextAsync(webElement);
              return text === pathSegments[i];
            }
            return false;
          });
        },
        'Get tree node for ' + pathSegments[i], () => {
          return !currentNode;
        },
        false,
        error => {
          this.logActionEnd('Handle path segment', error);
          this.logActionEnd('GoToNodeByPathAsync', currentNode);
        });

      if (currentNode) {
        await this.selectNodeAsync(currentNode);
      }

      this.logActionEnd('Handle path segment', pathSegments[i]);
    }

    this.logActionEnd('GoToNodeByPathAsync', currentNode);
    return currentNode;
  }

  public async selectNodeAsync(node: WebElement): Promise<void> {
    this.logActionStart('selectNodeAsync');
    await Utils.retryAsync(async () => {
      let span = await Utils.findElementAsync('span', null, node);
      await Utils.clickAsync(span);
      await this.clickToggleByNodeAsync(node);
    }, 'selectNodeAsync');
    this.logActionEnd('selectNodeAsync');
  }

  // TODO: FIX THIS.
  // tslint:disable-next-line:function-name
  public async GoToParentNodeByLevelAsync(level = 1): Promise<WebElement> {
    this.logActionStart('GoToParentNodeByLevelAsync', level);
    let treeElement = await this.getCurrentElementAsync();
    let selectedNodeElement = await this.getSelectedNodeAsync();
    for (let i = 0; i < level; i++) {
      selectedNodeElement = await Utils.findParentElementAsync(selectedNodeElement, '', 'tbody');
      if (!selectedNodeElement) {
        break;
      }
    }

    if (selectedNodeElement) {
      await this.selectNodeAsync(selectedNodeElement);
    }

    this.logActionEnd('GoToParentNodeByLevelAsync');
    return selectedNodeElement;
  }

  // TODO: FIX THIS.
  // tslint:disable-next-line:function-name
  public async GoToParentNodeByTextAsync(text: string): Promise<WebElement> {
    this.logActionStart('GoToParentNodeByTextAsync', text);

    let selectedNodeElement = await this.getSelectedNodeAsync();
    let parentNodeElement = selectedNodeElement;

    let currentNodeText = '';

    do {
      parentNodeElement = await this.GoToParentNodeByLevelAsync();
      currentNodeText = await this.getNodeTextAsync(parentNodeElement);
    } while (parentNodeElement && currentNodeText !== text);

    await this.selectNodeAsync(parentNodeElement);

    this.logActionEnd('GoToParentNodeByTextAsync', parentNodeElement);
    return parentNodeElement;
  }

  public async clickToggleByNodeAsync(node: WebElement): Promise<void> {
    this.logActionStart('clickToggleByNodeAsync');
    let toggle = await Utils.findElementAsync('.ui-treetable-toggler', null, node);
    if (toggle) {
      let titleAttribute = await Utils.getAttributeAsync(toggle, 'title');
      if (titleAttribute === 'Expand') {
        await Utils.clickAsync(toggle);
        let loadingElement = await Utils.findElementAsync('span', 'Loading...', node);
        await Utils.waitForNotVisibleAsync(loadingElement);
      }
    }
    this.logActionEnd('clickToggleByNodeAsync');
  }

  public async getSelectedNodeAsync(): Promise<WebElement> {
    this.logActionStart('getSelectedNodeAsync');

    let treeElement = await this.getCurrentElementAsync();
    let element = await Utils.findElementAsync('.ui-treetable-row.ui-state-highlight', null, treeElement);

    this.logActionEnd('getSelectedNodeAsync', element);
    return Utils.findParentElementAsync(element);
  }

  public async getNodeTextAsync(node: WebElement): Promise<string> {
    let textNode = await Utils.findElementAsync('.ui-treetable-row span', null, node);
    let text = '';
    if (textNode) {
      text = await Utils.getTextAsync(textNode);
    }
    return text;
  }

  public async getSubNodeTextList(node: WebElement): Promise<string[]> {
    this.logActionStart('getSubNodeTextList');
    let table = await Utils.findElementAsync('table', null, node);
    let tbodyList = await Utils.findDirectChildrenAsync(table);
    // let subNodes = await Utils.findElementsAsync('tbody .ui-treetable-child-table-container .ui-treetable-row span', null, node);
    let result: string[] = [];
    for (let i = 0; i < tbodyList.length; i++) {
      result.push(await this.getNodeTextAsync(tbodyList[i]));
    }
    this.logActionEnd('getSubNodeTextList', result.length);
    return result;
  }
}