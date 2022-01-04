import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
}
