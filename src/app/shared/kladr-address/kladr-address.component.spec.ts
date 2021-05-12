import { ComponentFixture, TestBed } from '@angular/core/testing'

import { KladrAddressComponent } from './kladr-address.component'

describe('KladrAddressComponent', () => {
  let component: KladrAddressComponent
  let fixture: ComponentFixture<KladrAddressComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KladrAddressComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(KladrAddressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
