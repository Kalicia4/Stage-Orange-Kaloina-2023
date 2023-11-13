import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './landingpage/pages/messages/messages.component';
import { StatisticsComponent } from './landingpage/pages/statistics/statistics.component';
import { CreateSubAccountComponent } from './landingpage/pages/create-sub-account/create-sub-account.component';
import { ViewSubAccountComponent } from './landingpage/pages/view-sub-account/view-sub-account.component';
import { MyAccountsComponent } from './landingpage/pages/my-accounts/my-accounts.component';
import { ConnexionComponent } from './login/connexion/connexion.component';
import { InscriptionComponent } from './login/inscription/inscription.component';
import { InscrireComponent } from './login/inscription/inscrire/inscrire.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NavbarAdminComponent } from './admin/sharepages/navbar-admin/navbar-admin.component';
import { AuthAdminGuardService } from './auth/adminauth/auth-admin-guard.service';


const routes: Routes = [
  {path:'', component:ConnexionComponent, data: { showNavbar: false, showFooter: false }},
  {path:'enregistrer', component:InscriptionComponent, data: { showNavbar: false, showFooter: false }},
  {path:'inscrire', component:InscrireComponent, data: { showNavbar: false, showFooter: false }},
  {path:'messages', component:MessagesComponent,canActivate: [AuthGuard]},
  {path:'statistics',component:StatisticsComponent,canActivate: [AuthGuard]},
  {path:'sub-account/create', component:CreateSubAccountComponent, canActivate: [AuthGuard]},
  {path:'sub-account/view', component:ViewSubAccountComponent,canActivate: [AuthGuard]},
  {path:'my-account', component:MyAccountsComponent, canActivate: [AuthGuard]},
  {path:'admin', component:NavbarAdminComponent, data: { showNavbar: false, showFooter: false }, canActivate:[AuthAdminGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
