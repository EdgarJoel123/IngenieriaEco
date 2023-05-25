import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAsesorComponent } from './vista-asesor.component';

describe('VistaAsesorComponent', () => {
  let component: VistaAsesorComponent;
  let fixture: ComponentFixture<VistaAsesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAsesorComponent]
    });
    fixture = TestBed.createComponent(VistaAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
