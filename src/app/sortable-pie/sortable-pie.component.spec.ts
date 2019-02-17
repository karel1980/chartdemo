import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortablePieComponent } from './sortable-pie.component';

describe('SortablePieComponent', () => {
  let component: SortablePieComponent;
  let fixture: ComponentFixture<SortablePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortablePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortablePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
