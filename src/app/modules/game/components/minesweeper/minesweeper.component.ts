import { Component, OnInit } from '@angular/core';
import { GameLevel } from '@app-models';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  //#region Class properties

  selectedDifficult: number;

  gameDifficult: GameLevel[] = [
    { name: "easy", size: 6, mine: 5 },
    { name: "medium", size: 9, mine: 10 },
    { name: "hard", size: 16, mine: 20 }
  ];

  //#endregion

  constructor() { }

  //#region

  ngOnInit(): void {
    this.initSetBorderSize();
  }

  //#endregion

  //#region Init methods

  private initSetBorderSize() {
    this.selectedDifficult = this.gameDifficult[0].mine;
  }

  //#endregion

  //#region UI events

  public setBorderSize(events: any): void {
    this.selectedDifficult = events.value;
  }

  //#endregion

}
