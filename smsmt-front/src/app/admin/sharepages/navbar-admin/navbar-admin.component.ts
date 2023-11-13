import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/auth/adminauth/auth-admin.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {

  @ViewChild('managing') managingElement!: ElementRef;
  @ViewChild('messages') messagesElement!: ElementRef;
  @ViewChild('statistics') statisticsElement!: ElementRef;

  constructor(private authAdmin: AuthAdminService, private router: Router){}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem("admin");

    if (storedUserData) {
      console.log(storedUserData)
      this.authAdmin.setAuthVerif(true);

    } else {
      console.log("aucun data stocké");

    }

    console.log(this.authAdmin.getAuthVerif())

  }

  deconnecter(){
    console.log(localStorage.getItem("admin"))
    localStorage.removeItem("admin")
    console.log(localStorage.getItem("admin"))

    this.router.navigate(['']);
    this.authAdmin.setAuthVerif(false);
  }

}
