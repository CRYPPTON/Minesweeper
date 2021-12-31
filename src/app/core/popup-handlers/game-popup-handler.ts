import { ErrorHandler, Injectable } from "@angular/core";
import { DialogType } from "@app-enums";
import { GamePopupHandlerError } from "@app-popup-handlers";
import { GameDialogService } from "@app-services";

@Injectable()
export class GamePopupHandler implements ErrorHandler {

  constructor(private gameDialogService: GameDialogService) { }

  handleError(error: any): void {

    if (error instanceof GamePopupHandlerError) {
      this.gameDialogService
        .openDialog(error.message, (error as GamePopupHandlerError).dialogType);
    } else {
      this.gameDialogService
        .openDialog('Unknown error occurred', DialogType.unknown);
    }

  }

}
