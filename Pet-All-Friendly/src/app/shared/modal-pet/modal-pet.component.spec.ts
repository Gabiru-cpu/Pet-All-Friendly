import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPetComponent } from './modal-pet.component';

describe('ModalPetComponent', () => {
  let component: ModalPetComponent;
  let fixture: ComponentFixture<ModalPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
