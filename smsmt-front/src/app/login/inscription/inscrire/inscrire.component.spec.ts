import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrireComponent } from './inscrire.component';

describe('InscrireComponent', () => {
  let component: InscrireComponent;
  let fixture: ComponentFixture<InscrireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscrireComponent]
    });
    fixture = TestBed.createComponent(InscrireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
