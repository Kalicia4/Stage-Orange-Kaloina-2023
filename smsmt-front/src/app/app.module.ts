import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './landingpage/sharepages/navbar/navbar.component';
import { MessagesComponent } from './landingpage/pages/messages/messages.component';
import { StatisticsComponent } from './landingpage/pages/statistics/statistics.component';
import { CreateSubAccountComponent } from './landingpage/pages/create-sub-account/create-sub-account.component';
import { ViewSubAccountComponent } from './landingpage/pages/view-sub-account/view-sub-account.component';
import { MyAccountsComponent } from './landingpage/pages/my-accounts/my-accounts.component';
import { ConnexionComponent } from './login/connexion/connexion.component';
import { InscriptionComponent } from './login/inscription/inscription.component';
import { InscrireComponent } from './login/inscription/inscrire/inscrire.component';
import { BarChartComponent } from './landingpage/pages/statistics/bar-chart/bar-chart.component';
import { NavbarAdminComponent } from './admin/sharepages/navbar-admin/navbar-admin.component';
import { GererCompteComponent } from './admin/pages/gerer-compte/gerer-compte.component';
import { VoirComponent } from './admin/pages/voir/voir.component';
import { EnableDialogComponent } from './admin/modals/enable-dialog/enable-dialog.component';
import { DeleteDialogComponent } from './admin/modals/delete-dialog/delete-dialog.component';
import { AdminStatisticComponent } from './admin/pages/admin-statistic/admin-statistic.component';
import { ModalAdminConnexionComponent } from './login/connexion/modal/modal-admin-connexion/modal-admin-connexion.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    MessagesComponent,
    StatisticsComponent,
    CreateSubAccountComponent,
    ViewSubAccountComponent,
    MyAccountsComponent,
    ConnexionComponent,
    InscriptionComponent,
    InscrireComponent,
    BarChartComponent,
    NavbarAdminComponent,
    GererCompteComponent,
    VoirComponent,
    EnableDialogComponent,
    DeleteDialogComponent,
    AdminStatisticComponent,
    ModalAdminConnexionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    HighchartsChartModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatRadioModule,


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
