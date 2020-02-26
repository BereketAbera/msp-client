import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtcProductComponent } from './utc-product.component';

describe('UtcProductComponent', () => {
  let component: UtcProductComponent;
  let fixture: ComponentFixture<UtcProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtcProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtcProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
