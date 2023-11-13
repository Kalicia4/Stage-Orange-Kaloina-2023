import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getProfil(telephone: string) {
    this.http.get(`http://localhost:8080/login/${telephone}`);;
  }

}
