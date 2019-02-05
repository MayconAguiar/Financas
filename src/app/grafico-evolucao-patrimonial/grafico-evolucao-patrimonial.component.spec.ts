import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoEvolucaoPatrimonialComponent } from './grafico-evolucao-patrimonial.component';

describe('GraficoEvolucaoPatrimonialComponent', () => {
  let component: GraficoEvolucaoPatrimonialComponent;
  let fixture: ComponentFixture<GraficoEvolucaoPatrimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoEvolucaoPatrimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoEvolucaoPatrimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
