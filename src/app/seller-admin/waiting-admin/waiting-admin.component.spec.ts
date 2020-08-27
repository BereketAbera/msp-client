import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAdminComponent } from './waiting-admin.component';

describe('WaitingAdminComponent', () => {
  let component: WaitingAdminComponent;
  let fixture: ComponentFixture<WaitingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
