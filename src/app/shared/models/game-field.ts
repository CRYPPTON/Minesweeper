import { GameSymbol } from "../enums";

export interface GameField {
  gameSymbol: GameSymbol;
  isMarked: boolean;
  number: number;
}
