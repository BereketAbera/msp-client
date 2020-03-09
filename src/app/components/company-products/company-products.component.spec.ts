import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProductsComponent } from './company-products.component';

describe('CompanyProductsComponent', () => {
  let component: CompanyProductsComponent;
  let fixture: ComponentFixture<CompanyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
