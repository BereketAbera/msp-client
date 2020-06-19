import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigModalComponent } from './edit-config-modal.component';

describe('EditConfigModalComponent', () => {
  let component: EditConfigModalComponent;
  let fixture: ComponentFixture<EditConfigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
