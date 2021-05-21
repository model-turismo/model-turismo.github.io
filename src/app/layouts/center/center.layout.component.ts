import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-center-layout',
  template: `<div class="app-layout-cont" [ngClass]="{ background: hasBackground }">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./center.layout.component.scss'],
})
export class CenterLayoutComponent {
  @Input() hasBackground: boolean = true;
}
