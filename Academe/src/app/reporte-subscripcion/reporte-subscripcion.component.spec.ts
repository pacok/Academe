import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSubscripcionComponent } from './reporte-subscripcion.component';

describe('ReporteSubscripcionComponent', () => {
  let component: ReporteSubscripcionComponent;
  let fixture: ComponentFixture<ReporteSubscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSubscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSubscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
