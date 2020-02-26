import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferBuyerComponent } from './refer-buyer.component';

describe('ReferBuyerComponent', () => {
  let component: ReferBuyerComponent;
  let fixture: ComponentFixture<ReferBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
