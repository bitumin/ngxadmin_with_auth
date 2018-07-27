import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}<br><a [href]="'https://maps.google.es/?q=' + encodeUrlParam(renderValue)" target="_blank">Ver Mapa</a>
  `,
})
export class AddressRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value;
  }

  encodeUrlParam(value) {
    return encodeURIComponent(value);
  }

}
