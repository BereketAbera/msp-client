import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOffPeakProductComponent } from './new-off-peak-product.component';

describe('NewOffPeakProductComponent', () => {
  let component: NewOffPeakProductComponent;
  let fixture: ComponentFixture<NewOffPeakProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOffPeakProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOffPeakProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
