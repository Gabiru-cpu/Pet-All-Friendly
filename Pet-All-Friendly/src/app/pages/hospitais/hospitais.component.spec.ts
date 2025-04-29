import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaisComponent } from './hospitais.component';

describe('HospitaisComponent', () => {
  let component: HospitaisComponent;
  let fixture: ComponentFixture<HospitaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
