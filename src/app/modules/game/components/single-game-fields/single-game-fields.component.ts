import { Component, Input } from '@angular/core';
import { GameEngineService } from 'src/app/core/services/game-engine.service';
import { GameSymbol } from 'src/app/shared/enums/game-symbol';

@Component({
  selector: 'app-single-game-fields',
  templateUrl: './single-game-fields.component.html',
  styleUrls: ['./single-game-fields.component.scss'],
})
export class SingleGameFieldsComponent {
  //#region Angular stuff

  @Input() row: number;
  @Input() col: number;

  //#endregion

  //#region Class properties

  get isGameOver(): boolean {
    return this.gameEngineService.isGameOver;
  }

  get field(): number | GameSymbol {
    return this.gameEngineService.board[this.row][this.col];
  }

  public isMarked: boolean;

  //#endregion

  constructor(private gameEngineService: GameEngineService) {
    this.isMarked = false;
    this.gameEngineService.unmarked$.subscribe(
      (next) => (this.isMarked = next)
    );
  }

  //#region UI Events

  public play(): void {
    if (!this.isMarked) {
      this.gameEngineService.play(this.row, this.col);
    }
  }

  /**
   * Marks the possible location of the mine.
   * @param event a MouseEvent object.
   */
  public onMarkMines(event: MouseEvent): void {
    event.preventDefault();
    if (this.gameEngineService.mineNumber > 0) {
      this.isMarked = !this.isMarked;
      this.isMarked
        ? this.gameEngineService.mineNumber--
        : this.gameEngineService.mineNumber++;
    } else {
      if (this.isMarked) {
        this.gameEngineService.mineNumber++;
      }
      this.isMarked = false;
    }
  }

  //#endregion
}
