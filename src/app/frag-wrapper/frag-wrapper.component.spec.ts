import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragWrapperComponent } from './frag-wrapper.component';

describe('FragWrapperComponent', () => {
  let component: FragWrapperComponent;
  let fixture: ComponentFixture<FragWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
