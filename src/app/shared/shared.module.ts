import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { GamePopupComponent } from './components/game-popup/game-popup.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GamePopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
    GamePopupComponent
  ]
})
export class SharedModule { }
