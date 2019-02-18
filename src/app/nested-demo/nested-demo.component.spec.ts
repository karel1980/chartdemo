import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedDemoComponent } from './nested-demo.component';

describe('NestedDemoComponent', () => {
  let component: NestedDemoComponent;
  let fixture: ComponentFixture<NestedDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
