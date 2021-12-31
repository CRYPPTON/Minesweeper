import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { GameLevel } from '@app-models';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  //#region Class properties

  selectedDifficulty: number;

  gameDifficulty: GameLevel[] = [
    { name: "easy", size: 6, mine: 5 },
    { name: "medium", size: 9, mine: 10 },
    { name: "hard", size: 16, mine: 20 }
  ];

  //#endregion

  constructor() { }

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
    this.selectedDifficulty = this.gameDifficulty[0].mine;
  }

  //#endregion

  //#region UI events

  /**
   * Set game difficulty.
   * @param events MatSelectChange object that contain game difficulty value.
   */
  public setBorderSize(events: MatSelectChange): void {
    this.selectedDifficulty = events.value;
  }

  //#endregion

}
