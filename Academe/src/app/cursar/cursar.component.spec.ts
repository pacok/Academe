import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursarComponent } from './cursar.component';

describe('CursarComponent', () => {
  let component: CursarComponent;
  let fixture: ComponentFixture<CursarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
