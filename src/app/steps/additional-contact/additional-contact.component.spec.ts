import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdditionalContactComponent } from './additional-contact.component'

describe('AdditionalContactComponent', () => {
  let component: AdditionalContactComponent
  let fixture: ComponentFixture<AdditionalContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalContactComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalContactComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
