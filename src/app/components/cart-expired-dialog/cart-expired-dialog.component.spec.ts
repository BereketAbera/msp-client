import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartExpiredDialogComponent } from './cart-expired-dialog.component';

describe('CartExpiredDialogComponent', () => {
  let component: CartExpiredDialogComponent;
  let fixture: ComponentFixture<CartExpiredDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartExpiredDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartExpiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
