import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LionSearchComponent } from './lion-search.component';

describe('LionSearchComponent', () => {
  let component: LionSearchComponent;
  let fixture: ComponentFixture<LionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
