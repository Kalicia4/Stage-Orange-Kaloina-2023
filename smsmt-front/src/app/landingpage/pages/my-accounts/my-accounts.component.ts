import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.css']
})
export class MyAccountsComponent {

  utilisateur: any = {} ;
  yourData: any;

  constructor(private http: HttpClient, private router: Router, private location: Location,  private authService: AuthService,private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {

    const storedUserData = localStorage.getItem("currentUser");

    this.route.queryParams.subscribe(params => {
      const user = params['user'];
      const phone = params['phone'];
      console.log('user:', user);
      console.log('Phone:', phone);

      const url = `http://localhost:8080/login/${user}`;
      // Effectuez la requête GET.
      this.http.get(url).subscribe((data) => {
          this.utilisateur = data;
          console.log(this.utilisateur);
      });

    });


      if (storedUserData) {
        this.authService.setAuthVerif(true);

      } else {
        console.log("aucun data stocké");

      }

      console.log(storedUserData)

  }

  deconnexion(){
    console.log(localStorage.getItem("currentUser"))
    localStorage.removeItem("currentUser")
    console.log(localStorage.getItem("currentUser"))

    this.router.navigate(['']);

    this.location.go(this.location.path());

    this.authService.setAuthVerif(false);

  }

}
