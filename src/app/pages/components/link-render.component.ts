import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <a [href]="renderValue" target="_blank">{{ (renderValue.length > 20) ? (renderValue | slice:0:20) + '...' : renderValue }}</a>
  `,
})
export class LinkRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value;
  }

}
