import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HoldAmountComponent } from './hold-amount.component'

describe('HoldAmountComponent', () => {
  let component: HoldAmountComponent
  let fixture: ComponentFixture<HoldAmountComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoldAmountComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldAmountComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
