import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
import { SousCompte } from 'src/entity/sous.compte.entity';




@Component({
  selector: 'app-create-sub-account',
  templateUrl: './create-sub-account.component.html',
  styleUrls: ['./create-sub-account.component.css']
})
export class CreateSubAccountComponent {
  hide = true;


  public sousCompte : SousCompte = new SousCompte();


  constructor( private http: HttpClient, private toastr: ToastrService) {

  }

  showSuccess() {
    this.toastr.success("sub-account created");
  }
  showError(){
    this.toastr.error("error");
  }
  showWarning(){
    this.toastr.warning("The provided sub-account login or phone number already exists")
  }




  Valider(){

    const storedUserData = localStorage.getItem("currentUser");

    if(storedUserData){
        const userData = JSON.parse(storedUserData);

        this.sousCompte.parent = userData.utilisateur
    }

    console.log(this.sousCompte.parent);

    this.http.post('http://localhost:8080/sousCompte/create', this.sousCompte , { observe: 'response' })
    .subscribe((response: HttpResponse<any>) => {
      console.log("reussie");
      this.showSuccess();
      this.sousCompte.login = '';
      this.sousCompte.mdp ='';
      this.sousCompte.nom ='';
      this.sousCompte.tel = '';

    },(error: HttpErrorResponse) => {
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
    });

  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    // Expression régulière pour vérifier le format du numéro de téléphone
    const phoneRegex = /^(032|037)[0-9]{7}$/;
    return phoneRegex.test(phoneNumber);
  }


}

