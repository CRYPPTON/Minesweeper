import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameDialogType } from '@app-models';

@Component({
  selector: 'app-game-popup',
  templateUrl: './game-popup.component.html',
  styleUrls: ['./game-popup.component.scss']
})
export class GamePopupComponent {

  //#region Class properties

  public icon: string;
  public styleClass: string;

  //#endregion

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameDialogType) { 
    if (data.dialogType == 'won') {
      this.icon = 'check_circle_outline';
      this.styleClass = 'success-icon';
    } else if (data.dialogType == 'lose') {
      this.icon = 'close';
      this.styleClass = 'failure-icon';
    } else {
      this.icon = 'error_outline';
      this.styleClass = 'failure-icon';
    }
  }


}

