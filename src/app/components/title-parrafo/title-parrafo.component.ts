import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-parrafo',
  templateUrl: './title-parrafo.component.html',
  styleUrls: ['./title-parrafo.component.scss'],
})
export class TitleParrafoComponent {
  @Input() titulo: string;
  @Input() info: string;

  constructor() {}
}
