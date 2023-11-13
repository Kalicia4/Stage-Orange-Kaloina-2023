import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MediationService } from '../service/mediation.service'
import { User } from '../models/inscription.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  // nom: string = '';
  // prenom: string = '';
  // nom_soc: string = '';
  // mail: string = '';
  // telephone: number = 0;

  public user : User = new User();

  constructor(private router: Router, private mediationService: MediationService ) { }



  onSubmit(inscriptionForm : NgForm) {
    console.log(inscriptionForm.form)
    console.log('valeur :', JSON.stringify(inscriptionForm.value) )
    console.log(this.user.nom)

    this.mediationService.sharedData = {
      nom:this.user.nom,
      prenom:this.user.prenom,
      nom_soc:this.user.nom_soc,
      mail:this.user.mail,
      telephone:this.user.telephone,
    }

    this.router.navigate(['/inscrire']);

  }


  isValidEmail(email: string): boolean {
    // Expression régulière pour vérifier le format de l'e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    // Expression régulière pour vérifier le format du numéro de téléphone
    const phoneRegex = /^(032|037)[0-9]{7}$/;
    return phoneRegex.test(phoneNumber);
  }


}
