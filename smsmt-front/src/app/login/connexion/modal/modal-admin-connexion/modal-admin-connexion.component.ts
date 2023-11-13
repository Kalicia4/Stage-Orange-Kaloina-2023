import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/auth/adminauth/auth-admin.service';

export interface DialogData {
  login: string;
  pswd: string;
}

@Component({
  selector: 'app-modal-admin-connexion',
  templateUrl: './modal-admin-connexion.component.html',
  styleUrls: ['./modal-admin-connexion.component.css']
})
export class ModalAdminConnexionComponent {

  login!: string;
  pswd!: string;

  constructor(
    public dialogRef: MatDialogRef<ModalAdminConnexionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private toastr: ToastrService,
    private authAdmin: AuthAdminService
  ) {}

  showError(){
    this.toastr.error("incorrect login and password");
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  hide = true;
  signIn(){
    if(this.login == "admin" && this.pswd == "admin"){
      localStorage.setItem("admin", JSON.stringify("admin"))
      this.authAdmin.setAuthVerif(true)
      this.router.navigate(['/admin']);
      this.dialogRef.close()
    }else{
      this.showError()
    }

    console.log(this.login)
    console.log(this.pswd)
  }


}
