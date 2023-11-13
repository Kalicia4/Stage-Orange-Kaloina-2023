import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Connexion } from '../models/connexion.model';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { ModalAdminConnexionComponent } from './modal/modal-admin-connexion/modal-admin-connexion.component';
import { MatDialog } from '@angular/material/dialog';
import { MediationService } from '../service/mediation.service';
import { Location } from '@angular/common';


// import { NgToastService } from 'ng-angular-popup/public-api';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  hide = true;

  public user : Connexion = new Connexion();



  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private toastr: ToastrService,public dialog: MatDialog) {}

  showError(){
    this.toastr.error("authentication error");
  }


  seConnecter() {
    // Envoyez les données du formulaire au serveur pour vérification
    this.http.post<boolean>('http://localhost:8080/login', this.user)
    .subscribe(
      (response) => {
        if (response) {
          const url = `http://localhost:8080/login/${this.user.utilisateur}`;
          // Effectuez la requête GET.
          this.http.get(url).subscribe((data: any) => {

            // Store the userData object in local storage
            localStorage.setItem("currentUser", JSON.stringify(data))
            this.router.navigate(['/messages'], { queryParams: { user: data.utilisateur, phone: data.telephone }, queryParamsHandling: 'merge' });
          });
          this.authService.setAuthVerif(true);
        }else{
          this.showError()
        }
      },
      (error) => {
        console.error(error);
        this.showError();
      }
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAdminConnexionComponent, {

    });
  }

}
