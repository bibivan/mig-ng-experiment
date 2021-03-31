import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StepPreloaderComponent } from './step-preloader.component'

describe('StepPreloaderComponent', () => {
  let component: StepPreloaderComponent
  let fixture: ComponentFixture<StepPreloaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepPreloaderComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPreloaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
