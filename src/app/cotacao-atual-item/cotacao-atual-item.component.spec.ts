import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoAtualItemComponent } from './cotacao-atual-item.component';

describe('CotacaoAtualItemComponent', () => {
  let component: CotacaoAtualItemComponent;
  let fixture: ComponentFixture<CotacaoAtualItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotacaoAtualItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoAtualItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
