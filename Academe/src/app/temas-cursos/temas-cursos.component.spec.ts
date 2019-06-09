import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasCursosComponent } from './temas-cursos.component';

describe('TemasCursosComponent', () => {
  let component: TemasCursosComponent;
  let fixture: ComponentFixture<TemasCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemasCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
