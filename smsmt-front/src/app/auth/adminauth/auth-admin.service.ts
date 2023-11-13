import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  authVerif : boolean = false;

  setAuthVerif(data: boolean) {
    this.authVerif = data;
  }

  getAuthVerif() {
    return this.authVerif;
  }

  constructor() { }
}
