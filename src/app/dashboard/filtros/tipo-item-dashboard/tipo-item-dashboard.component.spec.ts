import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItemDashboardComponent } from './tipo-item-dashboard.component';

describe('TipoItemDashboardComponent', () => {
  let component: TipoItemDashboardComponent;
  let fixture: ComponentFixture<TipoItemDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoItemDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoItemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
