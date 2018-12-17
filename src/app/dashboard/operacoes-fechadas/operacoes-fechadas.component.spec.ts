import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesFechadasComponent } from './operacoes-fechadas.component';

describe('OperacoesFechadasComponent', () => {
  let component: OperacoesFechadasComponent;
  let fixture: ComponentFixture<OperacoesFechadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesFechadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesFechadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
