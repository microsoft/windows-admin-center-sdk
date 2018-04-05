import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sme-iframe',
  template: `
    <p>
      iframe works!
    </p>
    <div>
      <iframe  style="height: 850px;" src="https://www.bing.com"></iframe>
    </div>
  `,
  styles: [`

  `]
})
export class IFrameComponent implements OnInit {

  constructor() {
    //
   }

  public ngOnInit() {
    //
  }

}
