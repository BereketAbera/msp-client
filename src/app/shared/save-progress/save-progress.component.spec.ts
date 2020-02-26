import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProgressComponent } from './save-progress.component';

describe('SaveProgressComponent', () => {
  let component: SaveProgressComponent;
  let fixture: ComponentFixture<SaveProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
