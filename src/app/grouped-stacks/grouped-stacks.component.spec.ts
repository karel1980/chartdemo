import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedStacksComponent } from './grouped-stacks.component';

describe('GroupedStacksComponent', () => {
  let component: GroupedStacksComponent;
  let fixture: ComponentFixture<GroupedStacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedStacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedStacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
