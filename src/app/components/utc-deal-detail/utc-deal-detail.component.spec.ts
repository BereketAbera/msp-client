import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtcDealDetailComponent } from './utc-deal-detail.component';

describe('UtcDealDetailComponent', () => {
  let component: UtcDealDetailComponent;
  let fixture: ComponentFixture<UtcDealDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtcDealDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtcDealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
