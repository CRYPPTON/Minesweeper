import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogType } from '@app-enums';
import { GamePopupComponent } from 'src/app/shared/components/game-popup/game-popup.component';

@Injectable({
  providedIn: 'root',
})
export class GameDialogService {
  constructor(public dialog: MatDialog) { }

  public openDialog(message: string, dialogType: DialogType): Promise<boolean> {
   const dialogPromise = this.dialog.open(GamePopupComponent, {
      data: {
        message: message,
        dialogType: dialogType,
      },
    }).afterClosed().toPromise();

    return dialogPromise;
  }
}
