import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLembreteComponent } from './modal-lembrete.component';

describe('ModalLembreteComponent', () => {
  let component: ModalLembreteComponent;
  let fixture: ComponentFixture<ModalLembreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLembreteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLembreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
