import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private login!: string;
  private id!: number;
  private email!:string;


  constructor() { }

  setLogin(data: string) {
    this.login = data;
  }

  getLogin() {
    return this.login;
  }

  setId(data: number) {
    this.id = data;
  }

  getId() {
    return this.id;
  }

  setEmail(data: string){
    this.email = data
  }

  getEmail(){
    return this.email
  }


}
