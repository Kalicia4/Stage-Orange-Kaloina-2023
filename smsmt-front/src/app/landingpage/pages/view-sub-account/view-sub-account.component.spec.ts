import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubAccountComponent } from './view-sub-account.component';

describe('ViewSubAccountComponent', () => {
  let component: ViewSubAccountComponent;
  let fixture: ComponentFixture<ViewSubAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubAccountComponent]
    });
    fixture = TestBed.createComponent(ViewSubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
