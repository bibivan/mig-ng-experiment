import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SecurityMessageComponent } from './security-message.component'

describe('SecurityMessageComponent', () => {
  let component: SecurityMessageComponent
  let fixture: ComponentFixture<SecurityMessageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityMessageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityMessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
