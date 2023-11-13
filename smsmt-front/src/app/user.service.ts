import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData!: string; // Définissez la propriété pour stocker les données utilisateur
  private username!: string;

  constructor() {}

  setUsername(data:string){
    this.username = data;
  }

  getUsername(){
    return this.username
  }

  setUserData(data: string) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }



}
