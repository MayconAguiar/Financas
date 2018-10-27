import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoDeRecursosComponent } from './alocacao-de-recursos.component';

describe('AlocacaoDeRecursosComponent', () => {
  let component: AlocacaoDeRecursosComponent;
  let fixture: ComponentFixture<AlocacaoDeRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocacaoDeRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoDeRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
