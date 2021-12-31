import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGameFieldsComponent } from './single-game-fields.component';

describe('SingleGameFieldsComponent', () => {
  let component: SingleGameFieldsComponent;
  let fixture: ComponentFixture<SingleGameFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleGameFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGameFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
