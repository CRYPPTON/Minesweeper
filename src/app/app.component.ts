import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from '@app-popup-handlers';
import { DialogType } from '@app-enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //#region Class properties

  title = 'minesweeper';

  //#endregion

  constructor(private translateService: TranslateService) {
    // set default language.
    translateService.setDefaultLang('en');
  }

  //#region

  /**
   * The method is used for testing purposes only.
   */
  public onOpenDialog(): void {
    // throw new GamePopupHandlerError(this.translateService.instant('dialogMessage.lose'), DialogType.lose);

    // test an unknown error.
    throw new Error();
  }

  //#endregion
}
