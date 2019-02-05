import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucaoPatrimonialComponent } from './evolucao-patrimonial.component';

describe('EvolucaoPatrimonialComponent', () => {
  let component: EvolucaoPatrimonialComponent;
  let fixture: ComponentFixture<EvolucaoPatrimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucaoPatrimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucaoPatrimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
