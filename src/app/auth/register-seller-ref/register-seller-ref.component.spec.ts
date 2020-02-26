import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSellerRefComponent } from './register-seller-ref.component';

describe('RegisterSellerRefComponent', () => {
  let component: RegisterSellerRefComponent;
  let fixture: ComponentFixture<RegisterSellerRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSellerRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSellerRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
