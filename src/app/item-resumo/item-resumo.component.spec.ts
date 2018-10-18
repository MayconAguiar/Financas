import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemResumoComponent } from './item-resumo.component';

describe('ItemResumoComponent', () => {
  let component: ItemResumoComponent;
  let fixture: ComponentFixture<ItemResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
