import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements AfterViewInit, OnChanges {

  //#region Class properties

  @Input() selectedDifficulty: number;

  //#endregion

  constructor() { }

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

}
