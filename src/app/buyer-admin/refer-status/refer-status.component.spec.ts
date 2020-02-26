import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferStatusComponent } from './refer-status.component';

describe('ReferStatusComponent', () => {
  let component: ReferStatusComponent;
  let fixture: ComponentFixture<ReferStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
