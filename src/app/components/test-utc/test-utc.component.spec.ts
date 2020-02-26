import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUtcComponent } from './test-utc.component';

describe('TestUtcComponent', () => {
  let component: TestUtcComponent;
  let fixture: ComponentFixture<TestUtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestUtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
