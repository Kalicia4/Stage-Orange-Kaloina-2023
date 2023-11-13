import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';
import { Email } from '../dataEmail/email.data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  login!:string;
  email!:string;
  emailData!:any

  constructor(private http: HttpClient, private data:DataService) {
    this.login = this.data.getLogin()
    this.email = this.data.getEmail()
  }

  delete(){

    console.log(this.email)
    this.emailData = new Email(
      this.email,
      "Account Deletion Notice",
      "We are reaching out to inform you of the recent deletion of your account "+this.login)


    this.http.delete(`http://localhost:8080/admin/delete/${this.data.getId()}`).subscribe(() => {
      // Mettez à jour la source de données après la suppression
      console.log("Donnée supprimé");
      this.http.post(`http://localhost:8080/mail`,this.emailData).subscribe(resp =>{
        console.log("mail sent ")
      }, error => {
        console.error("errrrroooorrrr", error);
      });

      window.location.reload();
    },
    (error:any) => {
      // Exécutez ce bloc si la suppression échoue
      console.error('Une erreur s\'est produite :', error);

    });
  }

}
