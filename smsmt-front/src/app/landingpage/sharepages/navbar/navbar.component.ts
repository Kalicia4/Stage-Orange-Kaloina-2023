import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  storedUserData: any;

  constructor( private router: Router){}



  messageLink() {
    this.storedUserData = localStorage.getItem("currentUser");
    if (this.storedUserData) {
      const userData = JSON.parse(this.storedUserData);
      const utilisateur = userData.utilisateur; // Valeur de l'utilisateur
      const telephone = userData.telephone; // Valeur du téléphone

      this.router.navigate(['/messages'], { queryParams: { user: utilisateur, phone: telephone } });

    } else {
      console.log("ne peux pas accéder à messages")
    }
  }

  staticLink(){
    this.storedUserData = localStorage.getItem("currentUser");
    if (this.storedUserData) {
      const userData = JSON.parse(this.storedUserData);
      const utilisateur = userData.utilisateur; // Valeur de l'utilisateur
      const telephone = userData.telephone; // Valeur du téléphone

      this.router.navigate(['/statistics'], { queryParams: { user: utilisateur, phone: telephone } });
      console.log("c'est activer")

    } else {
      console.log("il y a erreur")
    }
  }

  createLink(){
    this.storedUserData = localStorage.getItem("currentUser");
    if (this.storedUserData) {
      const userData = JSON.parse(this.storedUserData);
      const utilisateur = userData.utilisateur; // Valeur de l'utilisateur
      const telephone = userData.telephone; // Valeur du téléphone

      this.router.navigate(['/sub-account/create'], { queryParams: { user: utilisateur, phone: telephone } });
      console.log("c'est activer")

    } else {
      console.log("il y a erreur")
    }
  }

  viewLink(){
    this.storedUserData = localStorage.getItem("currentUser");
    if (this.storedUserData) {
      const userData = JSON.parse(this.storedUserData);
      const utilisateur = userData.utilisateur; // Valeur de l'utilisateur
      const telephone = userData.telephone; // Valeur du téléphone

      this.router.navigate(['/sub-account/view'], { queryParams: { user: utilisateur, phone: telephone } });
      console.log("c'est activer")

    } else {
      console.log("il y a erreur")
    }
  }

}
