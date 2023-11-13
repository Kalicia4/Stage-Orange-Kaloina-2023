import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubAccountComponent } from './create-sub-account.component';

describe('CreateSubAccountComponent', () => {
  let component: CreateSubAccountComponent;
  let fixture: ComponentFixture<CreateSubAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubAccountComponent]
    });
    fixture = TestBed.createComponent(CreateSubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
