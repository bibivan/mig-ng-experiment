import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumLoanHintComponent } from './sum-loan-hint.component';

describe('SumLoanHintComponent', () => {
  let component: SumLoanHintComponent;
  let fixture: ComponentFixture<SumLoanHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumLoanHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumLoanHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
