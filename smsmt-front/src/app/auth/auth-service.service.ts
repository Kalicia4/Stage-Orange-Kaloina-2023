import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authVerif : boolean = false;

  setAuthVerif(data: boolean) {
    this.authVerif = data;
  }

  getAuthVerif() {
    return this.authVerif;
  }

  constructor() { }
}
