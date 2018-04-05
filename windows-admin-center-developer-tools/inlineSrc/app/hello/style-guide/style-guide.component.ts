import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sme-style-guide',
  template: `
    <sme-tool-header>Honolulu Style Guide</sme-tool-header>
    <div class="overflow-margins table-indent">
        This component will contain a Style and UX design guid to help our partners build components that fit and flow with the rest of the application.
    </div>
  `,
  styles: [`

  `]
})
export class StyleGuideComponent implements OnInit {

  constructor() {
    // constructor logic
  }

  public ngOnInit() {
    // init logic
  }

}
