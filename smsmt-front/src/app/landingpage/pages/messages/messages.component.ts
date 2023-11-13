import { Component, OnInit, ViewChild } from '@angular/core';
import { ExempleService } from './exemple.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{


  displayedColumns: string[] = [ "destination", "text", "date"]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  donnees:  any = {}; // Assurez-vous que le type de données correspond à la structure de votre modèle.
  url!: string;
  urlProgrammed!:string;

  constructor(private exempleService: ExempleService, private route: ActivatedRoute,private datePipe: DatePipe, private http: HttpClient,  private userService: UserService) {
    // this.userData = userService.getUserData();
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const user = params['user'];
      const phone = params['phone'];
      console.log('user:', user);
      console.log('Phone:', phone);

      this.url = `http://localhost:8080/sms/envoie?emeteur=${phone}`;
      this.urlProgrammed = `http://localhost:8080/sms/programme?emeteur=${phone}`;
    })

    // Effectuez la requête GET.
    this.http.get<any[]>(this.url).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  voirEnvoyer(){


    // const url = `http://localhost:8080/sms/envoie?emeteur=${this.userData}`;

    // Effectuez la requête GET.
    this.http.get<any[]>(this.url).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.url)
    });

  }

   voirProgrammer(){

    // console.log(this.userData);

    // console.log(typeof this.userData)
    // Effectuez la requête GET.
    this.http.get<any[]>(this.urlProgrammed).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(data)

    });


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
