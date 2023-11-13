import { Component } from '@angular/core';
import { User } from '../../models/inscription.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MediationService } from '../../service/mediation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.css']
})
export class InscrireComponent {
  hide = true;

  public user : User = new User();

  motdepasseconfirmer!: string;


  constructor(private mediationService: MediationService, private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  showSuccess() {
    this.toastr.info("check your email for account activation");
  }
  showError(){
    this.toastr.error("there is an error");
  }
  showWarning(){
    this.toastr.warning("phone number or username already used")
  }

  Inscrire(){

     if (this.user.motdepasse !== this.motdepasseconfirmer) {
      alert("Les mots de passe ne correspondent pas !");
     }
    else{
      const confirmation = confirm("Would you like to register?");

      this.user.nom = this.mediationService.sharedData.nom;
      this.user.prenom = this.mediationService.sharedData.prenom;
      this.user.nom_soc = this.mediationService.sharedData.nom_soc;
      this.user.mail = this.mediationService.sharedData.mail;
      this.user.telephone = this.mediationService.sharedData.telephone;

      if(confirmation){
        this.http.post('http://localhost:8080/persons', this.user , { observe: 'response' })
        .subscribe((response: HttpResponse<any>) =>  {

          console.log(this.user)
          this.showSuccess()
          this.router.navigate(['']);


        } ,(error: HttpErrorResponse) => {
          // Vérifiez si le statut est un conflit
          if (error.status === 409) {
            // Gérez le conflit ici, par exemple afficher un message d'erreur à l'utilisateur
            console.error('Erreur de conflit : une valeur en double a été détectée.');
            this.showWarning();

          } else {
            // Gérez d'autres erreurs de requête ici
            console.error('Une erreur s\'est produite :', error.message);
            this.showError();

          }
        })

      }
    }

  }

}
