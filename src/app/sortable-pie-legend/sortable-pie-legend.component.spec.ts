import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortablePieLegendComponent } from './sortable-pie-legend.component';

describe('SortablePieLegendComponent', () => {
  let component: SortablePieLegendComponent;
  let fixture: ComponentFixture<SortablePieLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortablePieLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortablePieLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
