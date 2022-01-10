import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogType } from '@app-enums';
import { GameSymbol } from '@app-enums';
import { GameField, GameLevel } from '@app-models';
import { GameDialogService } from '@app-services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  //#region Class properties

  public unmarked$ = new BehaviorSubject<boolean>(false);

  gameDifficulty: GameLevel[] = [
    { name: 'easy', size: 6, mine: 4 },
    { name: 'medium', size: 9, mine: 10 },
    { name: 'hard', size: 16, mine: 20 },
  ];

  boardSize: number;
  mineNumber: number;
  isGameOver: boolean;
  level: number;

  board: Array<any>;

  //#endregion

  constructor(
    private translateService: TranslateService,
    private gameDialogService: GameDialogService
  ) {
    this.initGame();
  }

  //#region Init game methods

  /**
   * Initialization game properties.
   */
  public initGame(): void {
    this.level = this.findDifficulty();

    this.boardSize = this.gameDifficulty[this.level].size;

    this.isGameOver = false;

    this.mineNumber = this.gameDifficulty[this.level].mine;

    this.createBoard();
    this.generateMine();
  }

  //#endregion

  //#region Game functionality

  public play(row: number, col: number): void {
    this.checkGameLose(row, col);

    this.checkSelectedField(row, col);

    this.checkGameWin();
  }

  //#endregion

  //#region Check Game board methods

  /**
   * Check borders and set number in selected field.
   * @param row number that represents the selected row.
   * @param col number that represents the selected column.
   */
  private checkSelectedField(row: number, col: number): void {
    let numberOfMines = 0;
    if (row == 0) {
      if (row === col) {
        // check bottom and right.
        numberOfMines +=
          this.checkGameRow(row + 1, col) + this.checkColumn(row, col + 1);
      } else if (col === this.board.length - 1) {
        // check bottom and left.
        numberOfMines +=
          this.checkGameRow(row + 1, col) + this.checkColumn(row, col - 1);
      } else {
        // check bottom, right and left.
        numberOfMines +=
          this.checkColumn(row, col + 1) +
          this.checkGameRow(row + 1, col) +
          this.checkColumn(row, col - 1);
      }
    } else if (row == this.board.length - 1) {
      if (col === 0) {
        // check top and right.
        numberOfMines +=
          this.checkGameRow(row - 1, col) + this.checkColumn(row, col + 1);
      } else if (row == col) {
        // check top and left.
        numberOfMines +=
          this.checkGameRow(row - 1, col) + this.checkColumn(row, col - 1);
      } else {
        // check top, left and right.
        numberOfMines +=
          this.checkGameRow(row - 1, col) +
          this.checkColumn(row, col - 1) +
          this.checkColumn(row, col + 1);
      }
    } else if (col === 0 && (row > 0 || row < this.board.length)) {
      //check top, right and bottom.
      numberOfMines +=
        this.checkGameRow(row - 1, col) +
        this.checkGameRow(row + 1, col) +
        this.checkColumn(row, col + 1);
    } else if (
      col === this.board.length &&
      (row > 0 || row < this.board.length)
    ) {
      //check top, left and bottom.
      numberOfMines +=
        this.checkGameRow(row - 1, col) +
        this.checkGameRow(row + 1, col) +
        this.checkColumn(row, col - 1);
    } else {
      //check top, right, left and bottom.
      numberOfMines +=
        this.checkGameRow(row - 1, col) +
        this.checkGameRow(row + 1, col) +
        this.checkColumn(row, col - 1) +
        this.checkColumn(row, col + 1);
    }

    if (!this.isGameOver) {
      this.setBoard(row, col, numberOfMines);
    }
  }

  /**
   * Counts the mines on the Top or Bottom border of the selected field.
   * For Top set @row - 1;
   * For Bottom set @row + 1;
   * @param row number that represents the selected row.
   * @param col number that represents the selected column.
   * @returns Number of mines in a row.
   */
  private checkGameRow(row: number, col: number): number {
    let size = col + 1;
    let i = 0;
    let mines: number = 0;

    if (col == this.board.length - 1) {
      i = col - 1;
      size = this.board.length;
    } else if (col == 0) {
      i = col;
      size++;
    } else {
      i = col - 1;
      size += 1;
    }

    for (i; i < size; i++) {
      if (this.board[row][i].gameSymbol === GameSymbol.mine) {
        mines++;
      }
    }

    return mines;
  }

  /**
   * Counts the mines on the Left or Right side of the selected field.
   * For left set @col - 1;
   * For right set @col + 1;
   * @param row number that represents the selected row.
   * @param col number that represents the selected column.
   * @returns number of mines in field.
   */
  private checkColumn(row: number, col: number): number {
    let mines: number = 0;
    if (this.board[row][col].gameSymbol === GameSymbol.mine) {
      mines++;
    }
    return mines;
  }

  /**
   * Opens a dialog for lose if mines are affected and checks the result of the promise.
   * @param row number that represents the selected row.
   * @param col number that represents the selected column.
   */
  private checkGameLose = async (row: number, col: number): Promise<void> => {
    if (this.board[row][col] === GameSymbol.mine) {
      this.isGameOver = true;
      const result = await this.gameDialogService.openDialog(
        this.translateService.instant('dialogMessage.lose'),
        DialogType.lose
      );

      if (result) {
        this.unmarked$.next(false);
        this.initGame();
      }
    }
  };

  /**
   * Check for game win case.
   * @param row number that represents the selected row.
   * @param col number that represents the selected column.
   */
  private checkGameWin = async (): Promise<void> => {
    // let isAllFieldFilled = true;

    // for (let i = 0; i < this.boardSize; i++) {
    //   for (let j = 0; j < this.boardSize; j++) {
    //     if (this.board[i][j].gameSymbol === undefined) {
    //       isAllFieldFilled = false;
    //     }
    //   }
    // }

    // if (isAllFieldFilled) {
    //   this.isGameOver = true;
    //   const result = await this.gameDialogService.openDialog(
    //     this.translateService.instant('dialogMessage.won'),
    //     DialogType.won
    //   );
    //   if (result) {
    //     this.unmarked$.next(false);
    //     this.initGame();
    //   }
    // }
  };

  //#region Game utility

  /**
   * Create am empty game board.
   */
  public createBoard(): void {
    let board = new Array();
    for (let i = 0; i < this.boardSize; i++) {
      let newArray = new Array()
      for (let j = 0; j < this.boardSize; j++) {
        newArray.push({
          gameSymbol: '',
          isMarked: false,
          number: -1,
        }
        )
      }
      board.push(newArray);
    }
    this.board = board;
  }

  /**
   * Set mine on random position in game table.
   */
  public generateMine(): void {
    let level = this.findDifficulty();
    for (let i = 0; i < this.gameDifficulty[level].mine; i++) {
      let row = this.randomInteger();
      let col = this.randomInteger();
      if (this.board[row][col].gameSymbol == GameSymbol.mine) {
        i--;
      } else {
        this.board[row][col].gameSymbol = GameSymbol.mine;
      }
    }
  }

  /**
   * Find the current game level.
   * @returns number that represent current level.
   */
  private findDifficulty(): number {
    let level: number = 0;
    for (let i = 0; i < this.gameDifficulty.length; i++) {
      if (this.gameDifficulty[i].size == this.boardSize) {
        level = i;
      }
    }
    return level;
  }

  /**
   * Use method to generate random number.
   * @returns random number beetwen 0 and boardSize.
   */
  private randomInteger(): number {
    return Math.floor(Math.random() * this.boardSize);
  }

  /**
   * Set number in selected field that represent the number of mines in neighboring fields.
   * @param row number that represents the selected row.
   * @param col number that represents the selected column.
   * @param numberOfMines number of mines in neighboring fields.
   */
  private setBoard(row: number, col: number, numberOfMines: number): void {
    if (this.isGameOver) {
      this.board[row][col].number = numberOfMines;
    } else if (numberOfMines === 0) {
      this.board[row][col].gameSymbol = GameSymbol.white;
    } else {
      this.board[row][col].number = numberOfMines;
    }
  }

  //#endregion
}
