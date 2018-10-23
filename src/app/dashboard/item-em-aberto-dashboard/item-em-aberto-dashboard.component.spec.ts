import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEmAbertoDashboardComponent } from './item-em-aberto-dashboard.component';

describe('ItemEmAbertoDashboardComponent', () => {
  let component: ItemEmAbertoDashboardComponent;
  let fixture: ComponentFixture<ItemEmAbertoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEmAbertoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEmAbertoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
