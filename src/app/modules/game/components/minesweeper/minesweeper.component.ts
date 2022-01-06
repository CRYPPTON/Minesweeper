import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { GameEngineService } from '@app-services';
import { GameLevel } from 'src/app/shared/models';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  //#region Class properties

  selectedDifficulty: number;
  gameDifficulty: GameLevel[];
  level: number;

  get mineNumber(): number {
    return this.gameEngineService.mineNumber;
  }

  //#endregion

  constructor(private gameEngineService: GameEngineService) {
    this.gameDifficulty = this.gameEngineService.gameDifficulty;
    this.level = 0;
  }

  //#region Life cycle hook

  ngOnInit(): void {
    this.initSetBorderSize();
  }

  //#endregion

  //#region Init methods

  /**
   * Set init game difficulty
   */
  private initSetBorderSize() {
    this.selectedDifficulty = this.gameDifficulty[this.level].size;
    this.gameEngineService.boardSize = this.selectedDifficulty;
  }

  //#endregion

  //#region UI events

  /**
   * Set game difficulty.
   * @param events MatSelectChange object that contain game difficulty value.
   */
  public setBorderSize(events: MatSelectChange): void {
    this.selectedDifficulty = events.value;
    this.gameEngineService.boardSize = this.selectedDifficulty;
    this.gameEngineService.unmarked$.next(false);
    this.gameEngineService.initGame();
  }

  //#endregion

}
