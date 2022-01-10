import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { GameEngineService } from 'src/app/core/services';
import { GameSymbol } from 'src/app/shared/enums';
import { GameField } from 'src/app/shared/models';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements AfterViewInit, OnChanges {

  //#region Class properties

  @Input() selectedDifficulty: number;

  get board(): Array<any> {
    return this.gameEngineService.board
  }

  get isGameOver(): boolean {
    return this.gameEngineService.isGameOver;
  }

  public isMarked: boolean;

  //#endregion

  constructor(private gameEngineService: GameEngineService) {}

  //#region Life cycle hooks

  ngAfterViewInit(): void {
    this.setBorderSize();
  }

  ngOnChanges(): void {
    this.setBorderSize();
  }

  //#endregion

  //#region init methods

  /**
   * Set grid for selected board.
   */
  private setBorderSize(): void {
    const element = (document.querySelector('.game-table') as HTMLElement);
    element.style.gridTemplateColumns = `repeat(${this.selectedDifficulty}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${this.selectedDifficulty}, 1fr)`
  }

  //#endregion

  //#region UI Events

  public play(row: number, col: number): void {
    if (!this.isMarked) {
      this.gameEngineService.play(row, col);
    }
  }

  /**
   * Marks the possible location of the mine.
   * @param event a MouseEvent object.
   */
  public onMarkMines(event: MouseEvent, row: number, col: number): void {
    event.preventDefault();
    if (this.gameEngineService.mineNumber > 0) {
      this.board[row][col].isMarked = !this.board[row][col].isMarked;
      this.board[row][col].isMarked
        ? this.gameEngineService.mineNumber--
        : this.gameEngineService.mineNumber++;
    } else {
      if (this.board[row][col].isMarked) {
        this.gameEngineService.mineNumber++;
      }
      this.board[row][col].isMarked = false;
    }
  }

  //#endregion

}
