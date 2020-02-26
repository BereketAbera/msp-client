import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerNavigationComponent } from './buyer-navigation.component';

describe('BuyerNavigationComponent', () => {
  let component: BuyerNavigationComponent;
  let fixture: ComponentFixture<BuyerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
