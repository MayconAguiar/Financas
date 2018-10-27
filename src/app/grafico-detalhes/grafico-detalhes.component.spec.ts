import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDetalhesComponent } from './grafico-detalhes.component';

describe('GraficoDetalhesComponent', () => {
  let component: GraficoDetalhesComponent;
  let fixture: ComponentFixture<GraficoDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
