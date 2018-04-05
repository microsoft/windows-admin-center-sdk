import { WebElement } from 'selenium-webdriver';
import { Utils } from '../utils';
import { UIObject } from './uiObject';

export class TreeTable extends UIObject {
  protected selector = this.selector || 'sme-tree-table';

  // TODO: FIX THIS.
  // tslint:disable-next-line:function-name
  public async GoToNodeByPathAsync(path: string): Promise<WebElement> {
    this.logActionStart('GoToNodeByPathAsync', path);

    let scrollContainerWebElement = await this.findElementAsync('.scroll-container');
    await Utils.executeScript('arguments[0].scrollTop=0', scrollContainerWebElement);

    let treeNode: WebElement = null;

    let pathSegments = path.split('/');
    for (let i = 0; i < pathSegments.length; i++) {
      this.logActionStart('Handle path segment', pathSegments[i]);
      treeNode = null;
      await Utils.retryAsync(
        async () => {
          let scrollToBottom = false;
          do {
            await Utils.retryAsync(async () => {
              let nodes = await this.getNodesInViewPortAsync();
              for (let j = 0; j < nodes.length; j++) {
                let cellData = await Utils.findElementAsync('.first-data-column .sme-table-cell', null, nodes[j], async webElement=>{
                  let className = await webElement.getAttribute('className');
                  return className.indexOf('datatable-checkbox-container')===-1;
                });
                if (cellData) {
                  let cellDataText = await Utils.getTextAsync(cellData);
                  Utils.log('Scan tree node: ' + cellDataText);
                  if (cellDataText.toLowerCase() === pathSegments[i].toLowerCase()) {
                    Utils.log('Found tree node.');
                    treeNode = nodes[j];
                    await Utils.clickAsync(treeNode, true);
                    await Utils.waitAsync(async () => {
                      let text = await this.getTextAsync();
                      return text.indexOf('Loading...') === -1;
                    }, 'Wait for the sub nodes to be loaded.', false, true);

                    await Utils.retryAsync(async () => {
                      treeNode = await this.findElementAsync('.item.data.selected');
                      let treeToggle = await Utils.findElementAsync('.sme-table-expander-cell .sme-icon', null, treeNode);
                      let cssClass = await Utils.getAttributeAsync(treeToggle, 'className');
                      if (cssClass.indexOf('Right') !== -1) {
                        await Utils.clickAsync(treeNode, true);
                      }

                      cssClass = await Utils.getAttributeAsync(treeToggle, 'className');
                      if (cssClass.indexOf('Right') !== -1) {
                        await Utils.clickAsync(treeToggle, true);
                      }
                    }, 'Handle the tree toggle.');
                    break;
                  }
                }
              }
            }, 'Tries to scan the current tree nodes');

            if (!treeNode) {
              Utils.log('Cannot find the item in the current screen. Scroll down a little bit and continue.');
              let beforeScrollTop = await Utils.getAttributeAsync(scrollContainerWebElement, 'scrollTop');
              await Utils.executeScript('arguments[0].scrollTop+=arguments[0].offsetHeight-30', scrollContainerWebElement);
              Utils.log('Start scroll');
              Utils.log('Finish scroll');
              let afterScrollTop = await Utils.getAttributeAsync(scrollContainerWebElement, 'scrollTop');
              if (beforeScrollTop === afterScrollTop) {
                await Utils.executeScript('arguments[0].scrollTop=0', scrollContainerWebElement);
                Utils.log('Cannot find the item after scrolling through the whole list. Stop searching.');
                scrollToBottom = true;
              }
            }
          } while (!treeNode && !scrollToBottom);
        },
        'Get tree node for ' + pathSegments[i], () => {
          return !treeNode;
        },
        false,
        error => {
          this.logActionEnd('Handle path segment', error);
          this.logActionEnd('GoToNodeByPathAsync', treeNode);
        },
        10);

      this.logActionEnd('Handle path segment', pathSegments[i]);
    }

    this.logActionEnd('GoToNodeByPathAsync', treeNode);
    return treeNode;
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

  public async getSubNodeTextListFromSelectedNodeAsync(): Promise<string[]> {
    this.logActionStart('getSubNodeTextList');
    let result: string[];

    await Utils.retryAsync(async () => {
      result = [];
      let cellData = await this.findElementAsync('.item.data.selected .first-data-column .sme-table-cell');
      let cellDataText = await Utils.getTextAsync(cellData);

      let nodes = await this.getNodesInViewPortAsync();
      let startProcessingSubNodes = false;
      let treeStyleText = '';
      for (let i = 0; i < nodes.length; i++) {
        let currentCellData = await Utils.findElementAsync('.first-data-column .sme-table-cell', null, nodes[i]);
        if (!currentCellData) {
          break;
        }
        let currentCellDataText = await Utils.getTextAsync(currentCellData);

        if (currentCellDataText === cellDataText) {
          startProcessingSubNodes = true;
          continue;
        }

        if (startProcessingSubNodes) {
          let treeToggle = await Utils.findElementAsync('.sme-table-expander-cell', null, nodes[i]);
          let currentTreeStyleText = await Utils.getAttributeAsync(treeToggle, 'style');

          if (!treeStyleText || currentTreeStyleText === treeStyleText) {
            treeStyleText = currentTreeStyleText;
            result.push(currentCellDataText);
          } else {
            break;
          }
        }
      }
    }, 'getSubNodeTextList');

    this.logActionEnd('getSubNodeTextList', result.length);
    return result;
  }

  private async getNodesInViewPortAsync(): Promise<WebElement[]> {
    this.logActionStart('getNodesInViewPortAsync');
    let scrollDataTables = await this.findElementsAsync('.scroll-data');
    let scrollDataTable = scrollDataTables[scrollDataTables.length - 1];
    let nodes = await Utils.findElementsAsync('div.content tr.item.data', null, scrollDataTable);
    this.logActionEnd('getNodesInViewPortAsync');
    return nodes;
  }
}