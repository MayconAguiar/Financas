import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportaComponent } from './importa.component';

describe('ImportaComponent', () => {
  let component: ImportaComponent;
  let fixture: ComponentFixture<ImportaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
