import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSingupComponent } from './common-singup.component';

describe('CommonSingupComponent', () => {
  let component: CommonSingupComponent;
  let fixture: ComponentFixture<CommonSingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
