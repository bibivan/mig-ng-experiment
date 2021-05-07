import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTermHintComponent } from './insurance-term-hint.component';

describe('InsuranceTermHintComponent', () => {
  let component: InsuranceTermHintComponent;
  let fixture: ComponentFixture<InsuranceTermHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceTermHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTermHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
