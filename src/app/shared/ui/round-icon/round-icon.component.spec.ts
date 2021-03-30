import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundIconComponent } from './round-icon.component';

describe('RoundIconComponent', () => {
  let component: RoundIconComponent;
  let fixture: ComponentFixture<RoundIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
