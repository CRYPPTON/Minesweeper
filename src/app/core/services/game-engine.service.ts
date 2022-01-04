import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogType } from '@app-enums';
import { GameSymbol } from '@app-enums';
import { GameLevel } from '@app-models';
import { GamePopupHandlerError } from '@app-popup-handlers';
import { GameDialogService } from '@app-services';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  gameDifficulty: GameLevel[] = [
    { name: "easy", size: 6, mine: 4 },
    { name: "medium", size: 9, mine: 10 },
    { name: "hard", size: 16, mine: 20 }
  ];

  boardSize: number;
  board: Array<number[] | GameSymbol[]>;
  mineNumber: number;
  isGameOver: boolean;

  constructor(
    private translateService: TranslateService,
    private gameDialogService: GameDialogService
  ) { }

  //#region Init game methods

  public initGame(): void {
    this.isGameOver = false;

    this.createBoard();
    this.generateMine();
  }

  //#endregion

  //#region Game functionality

  public play(row: number, col: number): void {
    this.exceptionGameLose(row, col);
    this.checkSelectedField(row, col);
    this.exceptionGameWin();
  }

  //#endregion

  //#region Check Game board methods

  private checkSelectedField(row: number, col: number): void {
    let numberOfMines = 0;
    if (row == 0) {
      if (row === col) {

        // check bottom and right.
        numberOfMines += this.checkBottomBoard(row, col);
        numberOfMines += this.checkRightBoard(row, col);

      } else if (col === this.board.length - 1) {

        // check bottom and left.
        numberOfMines += this.checkBottomBoard(row, col);
        numberOfMines += this.checkLeftBoard(row, col);

      } else {

        // check bottom, right and left.
        numberOfMines += this.checkRightBoard(row, col);
        numberOfMines += this.checkBottomBoard(row, col);
        numberOfMines += this.checkLeftBoard(row, col);

      }
    } else if (row == this.board.length - 1) {
      if (col === 0) {

        // check top and right.
        numberOfMines += this.checkTopBoard(row, col);
        numberOfMines += this.checkRightBoard(row, col);

      } else if (row == col) {

        // check top and left.
        numberOfMines += this.checkTopBoard(row, col);
        numberOfMines += this.checkLeftBoard(row, col);

      } else {

        // check top, left and right.
        numberOfMines += this.checkTopBoard(row, col);
        numberOfMines += this.checkLeftBoard(row, col);
        numberOfMines += this.checkRightBoard(row, col);

      }
    } else if (col === 0 && (row > 0 || row < this.board.length)) {

      //check top, right and bottom.
      numberOfMines += this.checkTopBoard(row, col);
      numberOfMines += this.checkBottomBoard(row, col);
      numberOfMines += this.checkRightBoard(row, col);

    } else if (col === this.board.length && (row > 0 || row < this.board.length)) {
      //check top, left and bottom.
      numberOfMines += this.checkTopBoard(row, col);
      numberOfMines += this.checkBottomBoard(row, col);
      numberOfMines += this.checkLeftBoard(row, col);
    } else {
      //check top, right, left and bottom.
      numberOfMines += this.checkTopBoard(row, col);
      numberOfMines += this.checkBottomBoard(row, col);
      numberOfMines += this.checkLeftBoard(row, col);
      numberOfMines += this.checkRightBoard(row, col);
    }
    this.setBoard(row, col, numberOfMines);

  }

  private checkTopBoard(row: number, col: number): number {
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
      if (this.board[row - 1][i] === GameSymbol.mine) {
        mines++;
      }
    }

    return mines;
  }

  private checkBottomBoard(row: number, col: number): number {
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
      if (this.board[row + 1][i] === GameSymbol.mine) {
        mines++;
      }
    }

    return mines;
  }

  private checkLeftBoard(row: number, col: number): number {
    let mines: number = 0;
    if (this.board[row][col - 1] === GameSymbol.mine) {
      mines++;
    }
    return mines;
  }

  private checkRightBoard(row: number, col: number): number {
    let mines: number = 0;
    if (this.board[row][col + 1] === GameSymbol.mine) {
      mines++;
    }
    return mines;
  }

  private exceptionGameLose = async (row: number, col: number): Promise<void> => {

    if (this.board[row][col] === GameSymbol.mine) {
      this.isGameOver = true;
      const result = await this.gameDialogService.openDialog(
        this.translateService.instant('dialogMessage.lose'), DialogType.lose);

      if (result) {
        this.initGame()
      } else {
        //   throw new GamePopupHandlerError(
        //     this.translateService.instant('dialogMessage.lose'),
        //     DialogType.lose);
        // }
      }
    }

  }

  private exceptionGameWin() {
    let isAllFieldFilled = true;

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] === undefined) {
          isAllFieldFilled = false;
        }
      }
    }

    if (isAllFieldFilled) {
      throw new GamePopupHandlerError(
        this.translateService.instant('dialogMessage.won'),
        DialogType.won);
    }
  }

  //#region Game utility

  public createBoard(): void {
    let board = new Array();
    for (let i = 0; i < this.boardSize; i++) {
      board.push(new Array(this.boardSize));
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
      if (this.board[row][col] == GameSymbol.mine) {
        i--;
      } else {
        this.board[row][col] = GameSymbol.mine;
      }
    }
  }

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
    // get enum length.
    return Math.floor(Math.random() * this.boardSize);
  }

  private setBoard(row: number, col: number, numberOfMines: number | GameSymbol): void {
    if ( this.isGameOver ) {
      this.board[row][col] = GameSymbol.mine;
    } else if (numberOfMines === 0) {
      this.board[row][col] = GameSymbol.white;
    } else {
      this.board[row][col] = numberOfMines;
    }
  }

  //#endregion
}
