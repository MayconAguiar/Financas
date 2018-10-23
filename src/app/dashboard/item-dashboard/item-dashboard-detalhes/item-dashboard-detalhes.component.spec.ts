import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDashboardDetalhesComponent } from './item-dashboard-detalhes.component';

describe('ItemDashboardDetalhesComponent', () => {
  let component: ItemDashboardDetalhesComponent;
  let fixture: ComponentFixture<ItemDashboardDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDashboardDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDashboardDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
