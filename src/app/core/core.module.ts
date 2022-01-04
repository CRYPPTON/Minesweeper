import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePopupHandler } from '@app-popup-handlers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GamePopupHandler
    }
  ]
})
export class CoreModule { }
