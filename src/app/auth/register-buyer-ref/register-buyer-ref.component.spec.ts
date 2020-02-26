import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBuyerRefComponent } from './register-buyer-ref.component';

describe('RegisterBuyerRefComponent', () => {
  let component: RegisterBuyerRefComponent;
  let fixture: ComponentFixture<RegisterBuyerRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBuyerRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBuyerRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
