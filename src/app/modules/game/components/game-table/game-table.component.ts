import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements AfterViewInit, OnChanges {
  @Input() selectedDifficult: number;

  constructor() {}

  //#region Life cycle hooks

  ngAfterViewInit(): void {
    this.initBorderSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initBorderSize();
  }

  //#endregion

  //#region init methods

  private initBorderSize(): void {
    const element = (document.querySelector('.game-table') as HTMLElement);
    element.style.gridTemplateColumns = `repeat(${this.selectedDifficult}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${this.selectedDifficult}, 1fr)`
  }

  //#endregion

}
