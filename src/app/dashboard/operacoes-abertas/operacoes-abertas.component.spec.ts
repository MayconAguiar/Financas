import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesAbertasComponent } from './operacoes-abertas.component';

describe('OperacoesAbertasComponent', () => {
  let component: OperacoesAbertasComponent;
  let fixture: ComponentFixture<OperacoesAbertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesAbertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
