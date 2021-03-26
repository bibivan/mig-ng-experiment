import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFilesComponent } from './button-files.component';

describe('ButtonFilesComponent', () => {
  let component: ButtonFilesComponent;
  let fixture: ComponentFixture<ButtonFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
