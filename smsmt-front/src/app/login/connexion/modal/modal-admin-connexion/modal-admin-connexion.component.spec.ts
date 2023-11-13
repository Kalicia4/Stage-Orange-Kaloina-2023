import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminConnexionComponent } from './modal-admin-connexion.component';

describe('ModalAdminConnexionComponent', () => {
  let component: ModalAdminConnexionComponent;
  let fixture: ComponentFixture<ModalAdminConnexionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminConnexionComponent]
    });
    fixture = TestBed.createComponent(ModalAdminConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
