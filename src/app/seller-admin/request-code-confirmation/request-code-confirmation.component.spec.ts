import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCodeConfirmationComponent } from './request-code-confirmation.component';

describe('RequestCodeConfirmationComponent', () => {
  let component: RequestCodeConfirmationComponent;
  let fixture: ComponentFixture<RequestCodeConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCodeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCodeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
