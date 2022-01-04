import { ErrorHandler, Injectable } from "@angular/core";
import { DialogType } from "@app-enums";
import { GamePopupHandlerError } from "@app-popup-handlers";
import { GameDialogService } from "@app-services";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class GamePopupHandler implements ErrorHandler {

  constructor(
    private gameDialogService: GameDialogService,
    private translationService: TranslateService
    ) { }

  handleError(error: any): void {

    if (error instanceof GamePopupHandlerError) {
      this.gameDialogService
        .openDialog(error.message, (error as GamePopupHandlerError).dialogType);
    } else {
      this.gameDialogService
        .openDialog(this.translationService.instant("dialogMessage.unknown"), DialogType.unknown);
    }

  }

}
