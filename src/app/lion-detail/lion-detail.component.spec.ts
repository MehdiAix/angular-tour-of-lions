import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LionDetailComponent } from './lion-detail.component';

describe('LionDetailComponent', () => {
  let component: LionDetailComponent;
  let fixture: ComponentFixture<LionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
