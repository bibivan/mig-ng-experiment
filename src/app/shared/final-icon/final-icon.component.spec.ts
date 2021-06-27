import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalIconComponent } from './final-icon.component';

describe('FinalIconComponent', () => {
  let component: FinalIconComponent;
  let fixture: ComponentFixture<FinalIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
