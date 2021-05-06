import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnilsHintComponent } from './snils-hint.component';

describe('SnilsHintComponent', () => {
  let component: SnilsHintComponent;
  let fixture: ComponentFixture<SnilsHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnilsHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnilsHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
