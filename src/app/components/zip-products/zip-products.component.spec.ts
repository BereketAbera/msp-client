import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipProductsComponent } from './zip-products.component';

describe('ZipProductsComponent', () => {
  let component: ZipProductsComponent;
  let fixture: ComponentFixture<ZipProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
