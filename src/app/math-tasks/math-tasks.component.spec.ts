import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathTasksComponent } from './math-tasks.component';

describe('MathTasksComponent', () => {
  let component: MathTasksComponent;
  let fixture: ComponentFixture<MathTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
