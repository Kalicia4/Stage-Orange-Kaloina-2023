import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { DataService } from '../../data.service';
import { Email } from '../dataEmail/email.data';


@Component({
  selector: 'app-enable-dialog',
  templateUrl: './enable-dialog.component.html',
  styleUrls: ['./enable-dialog.component.css']
})
export class EnableDialogComponent {

  login!:string;
  email!:string;

  constructor(private http: HttpClient, private data:DataService) {
    this.login = this.data.getLogin()
    this.email = this.data.getEmail()
  }


  url!:string;
  urlmail:string = `http://localhost:8080/mail`;
  emailData!:any


  enable(){
    console.log(this.email)
    this.emailData = new Email(
      this.email,
      "Your Account is Now Active: Welcome "+ this.login +" !",
      "We are pleased to inform you that your account has been successfully activated.To access your account, please click on the following link:http://localhost:4200/")

    this.url = `http://localhost:8080/login/${this.data.getId()}/active`
  }

  disable(){
    console.log(this.email)
    this.emailData = new Email(
      this.email,
      " Account Deactivation Notice",
      "We regret to inform you that your account " +this.login+ " has been disabled")

    this.url = `http://localhost:8080/login/${this.data.getId()}/desactive`
  }

  radioChange(event: any) {
    if (event.value === 'enable') {
      this.enable();
      console.log("enable click")
    } else if (event.value === 'disable') {
      this.disable();
    }
  }


  onclick(){
    let mailSent = false

    console.log(this.url)
    this.http.put(this.url, this.data).subscribe(response => {

      this.http.post(this.urlmail,this.emailData).subscribe(resp =>{
        console.log("mail sent ")
        mailSent = true
        console.log(mailSent)

          if (mailSent) {
            window.location.reload();
          }

      }, error => {
        console.error("errrrroooorrrr", error);
      });
      // Gérez la réponse de la mise à jour, par exemple affichez un message de succès
      console.log('Données mises à jour avec succès', response);

    }, error => {
      // Gérez les erreurs éventuelles ici
      console.error('Erreur lors de la mise à jour des données', error);

    });

  }

}
