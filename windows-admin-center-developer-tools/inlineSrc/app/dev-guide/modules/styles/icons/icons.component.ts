import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-icons',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">
          <h1>Icons</h1>
          <section>
              <p>
                  <span>SME has a range of predefined font icons the size and characters used for these icons may change with the current</span>
                  <a class="sme-link" routerLink="/dev/styles/themes">theme.</a>
              </p>

              <p>All icon classes must be used in conjunction with the following class:</p>
              <code>.sme-icon</code>
          </section>
          <h2>Icon Sizes</h2>
          <section>
              <p>The sme icon size classes can be used to change the size of an icon. The default size depends on the typographical context of the icon. ie. The icon will be larger in an h1 tag than in a label tag.</p>

              <p>Use the following class structure to manually apply an icon size</p>
              <code>.sme-icon-size-[size]</code>

              <div class="sme-arrange-wrapstack-h">
                  <div *ngFor="let size of iconSizes" class="sme-arrange-stack-v sme-margin-inset-xs">
                      <div class="sme-position-center-h-inline sme-font-label">{{size}}</div>
                      <div [ngClass]="['sme-position-center-h-block sme-icon sme-icon-server', 'sme-icon-size-'+ size]"></div>
                  </div>
              </div>
          </section>
          <h2>Icon Characters</h2>
          <section>
              <p>While the characters may change with the theme. You can use there name to indicate the purpose of the icon.</p>
              <p>To accomplish this, use the following class structure:</p>
              <code>.sme-icon-[name]</code>
              <p>Here is the current list of icons and there names:</p>
              <div class="sme-arrange-wrapstack-h">
                  <div *ngFor="let key of iconKeys" class="sme-arrange-stack-v sme-margin-right-xxl sme-margin-bottom-xxl sme-border-inset-sm sme-padding-inset-sm" style="min-width:200px">
                      <div class="sme-position-center-h-inline sme-font-label sme-margin-bottom-sm">{{key}}</div>
                      <div [ngClass]="['sme-position-center-h-block sme-icon sme-icon-size-xl', 'sme-icon-'+ key]"></div>
                      <!-- Uncomment next line to test old icon-win styles -->
                      <!-- <div [ngClass]="['sme-position-center-h-block sme-icon sme-icon-size-xl', 'icon-win-'+ key]"></div> -->
                  </div>
              </div>
          </section>

          <h2>Example</h2>
          <section>
              <p>Putting it all together, we can create a large server icon using the following classes</p>
              <code>sme-icon sme-icon-size-lg sme-icon-server</code>
          </section>


          <h2>Custom Icons</h2>
          <section>
              <p>The SME icon set doesnt include every possible icon. As such it may become nessecary to use some of your own icons. However, try and use a built in icon as much as possible.</p>
              <p>To create your own custom icons that adhear to the icons layout requirements of sme you should use the following technique: </p>
              <ol>
                  <li>Use the .sme-icon and .sme-icon-size classes as usual</li>
                  <li>derive your own class to change the font only</li>
                  <li>derive a seperate class to change just the 'content' property of the icon</li>
              </ol>

              <p>After this your class might look like</p>
              <code>sme-icon sme-icon-size-lg my-icon my-icon-custom</code>

              <p>In additon your css might look like</p>
              <code>.my-icon {{'{'}} font-family: 'MyGlyphs' }</code>
              <code>.my-icon-custom {{'{'}} content: '\\E123' }</code>
          </section>
      </div>
    `
})
export class IconsComponent {

    public iconSizes = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs', 'xxxs'];
    /* tslint:disable:max-line-length */
    public iconCharacters = {
        _none: '', accept: 'E8FB', add: 'E710', allApps: 'E71D', allAppsMirrored: 'EA40', asterisk: 'EA38', attach: 'E723', back: 'E72B',
        backMirrored: 'F0D2', backToWindow: 'E73F', blocked: 'E733', blocked2: 'ECE4', bootOrder: 'F42F', bootOrderMirrored: 'F430',
        bulletedList: 'E8FD', bulletedListMirrored: 'EA42', cancel: 'E711', certificateManager: 'F1F8', chat: 'E901', checkbox: 'E739',
        checkboxComposite: 'E73A', checkList: 'E9D5', checklistMirrored: 'F0B5', chevronDown: 'E70D', chevronDownMed: 'E972',
        chevronDownSmall: 'E96E', chevronLeft: 'E76B', chevronLeftMed: 'E973', chevronLeftSmall: 'E96F', chevronRight: 'E76C',
        chevronRightMed: 'E974', chevronRightSmall: 'E970', chevronUp: 'E70E', chevronUpMed: 'E971', chevronUpSmall: 'E96D', clear: 'E894',
        clearFilter: 'EF8F', cluster: 'F202', code: 'E943', collapseContentSingle: 'F166', completed: 'E930', connect: 'E703',
        contact: 'E77B', copy: 'E8C8', cPU: 'EEA1', ctrlAltDlt: '\EDB6', customList: 'EEBE', customListMirrored: 'EEBF', database: 'EFC7', 
        delete: 'E74D', developerTools: 'EC7A', developerToolsRemove: 'F3EA', dietPlanNotebook: 'EAC8', disconnectDrive: 'E8CD', 
        down: 'E74B', download: 'E896', edit: 'E70F', editMirrored: 'EB7E', embed: 'ECCE', eraseTool: 'E75C', error: 'E783', 
        errorBadge: 'EA39', exploreContentSingle: 'F164', failoverClusterManager: 'F204', favoriteStar: 'E734', favoriteStarFill: 'E735', 
        fileExplorer: 'EC50', filter: 'E71C', firewall: 'F1F9', firewallRules: 'F1FA', flag: 'E7C1', folder: 'E8B7', formatDatabase: 'F3BE', forward: 'E72A',
        forwardMirrored: 'F0D3', fullScreen: 'E740', gateway: 'ED23', globalNavButton: 'E700', hardDrive: 'EDA2', hardDriveGroup: 'F18F',
        heart: 'EB51', help: 'E897', helpMirrored: 'EA51', history: 'E81C', home: 'E80F', hostCluster: 'EEA2', hourGlass: 'EA03',
        info: 'E946', lEDLight: 'E781', lEDLightOff: 'F388', link: 'E71B', localAdmin: 'F1FB', lock: 'E72E', mail: 'E715', manage: 'E912',
        mapDrive: 'E8CE', market: 'EAFC', marketDown: 'EF42', more: 'E712', networkPhysical: 'F211', networkPipes: 'ECE3',
        networkSettings: 'F1FC', newFolder: 'E8F4', newWindow: 'E78B', oEM: 'E74C', offlineResource: 'F38D', onlineResource: 'F38E',
        openFile: 'E8E5', openFolderHorizontal: 'ED25', openInNewWindow: 'E8A7', paste: 'E77F', pause: 'E769', pC1: 'E977',
        permissions: 'E8D7', pin: 'E718', play: 'E768', playPause: 'ED38', powerButton: 'E7E8', powerShell: 'F1FD', processing: 'E9F5',
        publish: 'ECDB', putHardDiskOnline: 'F4AD', rAM: 'EEA0', recent: 'E823', redo: 'E7A6', refresh: 'E72C', registrayEditor: 'F1FF',
        remote: 'E8AF', remove: 'E738', removeHardDisk: 'F389', ringer: 'EA8F', save: 'E74E', saveAll: 'F203', saveLocal: 'E78C',
        search: 'E721', server: 'F201', serverFeatures: 'F200', serverProcesses: 'F1FE', settings: 'E713', share: 'E72D', shop: 'E719',
        softwareDefinedDataCenter: 'F205', sort: 'E8CB', speedHigh: 'EC4A', speedHighOff: 'F42E', statusCircleBlock: 'F140',
        statusCircleBlock2: 'F141', statusCircleCheckmark: 'F13E', statusCircleErrorX: 'F13D', statusCircleExclamation: 'F13C',
        statusCircleInfo: 'F13F', statusCircleInner: 'F137', statusCircleOuter: 'F136', statusCircleQuestionMark: 'F142',
        statusCircleRing: 'F138', statusCircleSync: 'F143', statusTriangleExclamation: 'F13B', statusTriangleInner: 'F13A',
        statusTriangleOuter: 'F139', stop: 'E71A', storageLogical: 'F20E', storagePhysical: 'F20F', storageReplica: 'F42D',
        switch: 'E8AB', sync: 'E895', takeHardDiskOffline: 'F4AC', toolbox: 'ECED', tripleColumn: 'F1D5', undo: 'E7A7', unfavorite: 'E8D9',
        unknown: 'E9CE', unlock: 'E785', unpin: 'E77A', unzipFolder: 'F3FD', up: 'E74A', updateRestore: 'E777', upload: 'E898',
        virtualHardDisk: 'F38A', virtualMachine: 'EE9B', virtualMachineGroup: 'EEA3', virtualNIC: 'F38C', virtualSwitch: 'F38B',
        warning: 'E7BA', windowsUpdate: 'F0C5'
    };
    /* tslint:enable:max-line-length */

    public iconKeys = Object.keys(this.iconCharacters);

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Icons';
    }
}
