import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrdersComponent } from './buyer-orders.component';

describe('BuyerOrdersComponent', () => {
  let component: BuyerOrdersComponent;
  let fixture: ComponentFixture<BuyerOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
