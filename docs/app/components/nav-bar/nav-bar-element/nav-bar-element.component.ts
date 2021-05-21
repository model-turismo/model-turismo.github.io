import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-element',
  template: `
    <a
      [routerLink]="link"
      routerLinkActive="selected"
      [routerLinkActiveOptions]="{ exact: true }"
      ><ng-content></ng-content
    ></a>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: black;
        font-size:20px
        margin-left:10px;
      }

      .selected {
        font-size:30px
      }
    `,
  ],
})
export class NavBarElementComponent {
  @Input() link: string;
}
