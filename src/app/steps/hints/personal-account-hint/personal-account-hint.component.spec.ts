import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PersonalAccountHintComponent } from './personal-account-hint.component'

describe('PersonalAccountHintComponent', () => {
  let component: PersonalAccountHintComponent
  let fixture: ComponentFixture<PersonalAccountHintComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalAccountHintComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAccountHintComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
