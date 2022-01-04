import { Component, Input } from '@angular/core';
import { GameEngineService } from 'src/app/core/services/game-engine.service';
import { GameSymbol } from 'src/app/shared/enums/game-symbol';

@Component({
  selector: 'app-single-game-fields',
  templateUrl: './single-game-fields.component.html',
  styleUrls: ['./single-game-fields.component.scss']
})
export class SingleGameFieldsComponent {

  //#region Angular stuff

  @Input() row: number;
  @Input() col: number;

  get isGameOver(): boolean {
    return this.gameEngineService.isGameOver;
  }

  // field: number | GameSymbol;

  get field(): number | GameSymbol {
    return this.gameEngineService.board[this.row][this.col];
  }

  public isMarked: boolean = false;

  //#endregion

  constructor(private gameEngineService: GameEngineService) {
    this.gameEngineService.initGame();
  }

  //#region UI Events

  public play(): void {
      this.gameEngineService.play(this.row, this.col);
  }

  public setMine(event: MouseEvent): void {
    event.preventDefault();
    this.isMarked = !this.isMarked;
    this.gameEngineService.mineNumber--;
  }

  //#endregion

}
