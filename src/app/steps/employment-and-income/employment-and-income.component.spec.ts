import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentAndIncomeComponent } from './employment-and-income.component';

describe('EmploymentAndIncomeComponent', () => {
  let component: EmploymentAndIncomeComponent;
  let fixture: ComponentFixture<EmploymentAndIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentAndIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentAndIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
