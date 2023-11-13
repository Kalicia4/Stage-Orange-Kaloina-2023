import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Connexion } from './login/models/connexion.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'essaie';

  showNavbar: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService:UserService) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.activatedRoute;
        while (currentRoute.firstChild) {
          currentRoute.firstChild.data.subscribe((data) => {
            this.showNavbar = data["showNavbar"] !== false;
            this.showFooter = data["showFooter"] !== false;
          });
          currentRoute = currentRoute.firstChild;
        }
      }

    })
  }

  ngOnInit(){

  }


}
