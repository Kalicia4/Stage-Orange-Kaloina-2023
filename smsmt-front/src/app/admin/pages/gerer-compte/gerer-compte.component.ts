
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { EnableDialogComponent } from '../../modals/enable-dialog/enable-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../../data.service';
import { DeleteDialogComponent } from '../../modals/delete-dialog/delete-dialog.component';




@Component({
  selector: 'app-gerer-compte',
  templateUrl: './gerer-compte.component.html',
  styleUrls: ['./gerer-compte.component.css']
})
export class GererCompteComponent {
  displayedColumns: string[] = ['utilisateur', 'telephone', 'mail', 'nom_soc', 'etat', 'action','delete'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private http: HttpClient, private data:DataService) {}

  ngOnInit(): void {


    const url = `http://localhost:8080/admin/inscrits`;

    // Effectuez la requête GET.
    this.http.get<any[]>(url).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(): void {
    this.dialog.open(EnableDialogComponent, {
      width: '250px',
    });


  }

  onclick(id:number, login:string, email:string){

    this.data.setId(id);
    this.data.setLogin(login);
    this.data.setEmail(email);

    this.openDialog()

    console.log(this.data.getId());

  }

  openDeleteDialog():void{
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });
  }

  delete(id:number, login:string, email:string){
    this.data.setId(id);
    this.data.setLogin(login);
    this.data.setEmail(email)
    this.openDeleteDialog()
  }






}
