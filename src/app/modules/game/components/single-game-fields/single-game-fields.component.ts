import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-game-fields',
  templateUrl: './single-game-fields.component.html',
  styleUrls: ['./single-game-fields.component.scss']
})
export class SingleGameFieldsComponent {

  //#region Angular stuff

  @Input() row: number;
  @Input() col: number;

  //#endregion

  constructor() { }

}
