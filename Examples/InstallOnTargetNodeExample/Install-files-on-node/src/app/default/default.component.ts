import { Component, OnInit } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
  constructor(private appContextService: AppContextService) {}
  public response: any;
  public installOnNode() {
    this.post('contoso.install-files-on-node', '1.2.0',
    this.appContextService.activeConnection.nodeName).subscribe(
      (response: any) => {
        console.log(response);
        this.response = response;
      },
      (error) => {
        console.log(error);
        this.response = error;
      }
    );
  }

  public post(id: string, version: string, targetNode: string): Observable<any> {
    return this.appContextService.node.post( targetNode,
        `features/extensions/${id}/versions/${version}/install`);
}

}
