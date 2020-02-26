import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResultComponent } from './request-result.component';

describe('RequestResultComponent', () => {
  let component: RequestResultComponent;
  let fixture: ComponentFixture<RequestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
