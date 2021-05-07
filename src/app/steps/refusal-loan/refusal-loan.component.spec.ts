import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusalLoanComponent } from './refusal-loan.component';

describe('RefusalLoanComponent', () => {
  let component: RefusalLoanComponent;
  let fixture: ComponentFixture<RefusalLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefusalLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
