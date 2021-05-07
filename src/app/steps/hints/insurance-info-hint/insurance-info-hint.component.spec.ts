import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceInfoHintComponent } from './insurance-info-hint.component';

describe('InsuranceInfoHintComponent', () => {
  let component: InsuranceInfoHintComponent;
  let fixture: ComponentFixture<InsuranceInfoHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceInfoHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceInfoHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
