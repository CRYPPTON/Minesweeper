import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import { SingleGameFieldsComponent } from './components/single-game-fields/single-game-fields.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MinesweeperComponent,
    GameTableComponent,
    SingleGameFieldsComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class GameModule { }
