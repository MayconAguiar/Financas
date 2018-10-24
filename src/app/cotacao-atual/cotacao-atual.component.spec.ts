import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoAtualComponent } from './cotacao-atual.component';

describe('CotacaoAtualComponent', () => {
  let component: CotacaoAtualComponent;
  let fixture: ComponentFixture<CotacaoAtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotacaoAtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
