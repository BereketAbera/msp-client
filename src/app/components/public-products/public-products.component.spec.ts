import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProductsComponent } from './public-products.component';

describe('PublicProductsComponent', () => {
  let component: PublicProductsComponent;
  let fixture: ComponentFixture<PublicProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
