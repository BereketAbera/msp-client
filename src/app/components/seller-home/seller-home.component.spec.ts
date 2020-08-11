import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHomeComponent } from './seller-home.component';

describe('SellerHomeComponent', () => {
  let component: SellerHomeComponent;
  let fixture: ComponentFixture<SellerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
