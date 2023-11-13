import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-voir',
  templateUrl: './voir.component.html',
  styleUrls: ['./voir.component.css']
})
export class VoirComponent {
  displayedColumns: string[] = ["emetteur","sous_compte", "destination", "text", "date"];
  data = new MatTableDataSource<any>;


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient){}

  ngOnInit(): void {


    const url = `http://localhost:8080/admin/envoi`;

    // Effectuez la requête GET.
    this.http.get<any[]>(url).subscribe((donne) => {
      this.data = new MatTableDataSource(donne)
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }


  isButtonClicked1: boolean = false;
  isButtonClicked2: boolean = false;

  onClickButton1() {
    this.isButtonClicked1 = true;
    this.isButtonClicked2 = false;

    const url = `http://localhost:8080/admin/envoi`;

    // Effectuez la requête GET.
    this.http.get<any[]>(url).subscribe((donne) => {
      this.data = new MatTableDataSource(donne)
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });

  }

  onClickButton2() {
    this.isButtonClicked2 = true;
    this.isButtonClicked1 = false;

    const url = `http://localhost:8080/admin/programme`;

    // Effectuez la requête GET.
    this.http.get<any[]>(url).subscribe((donne) => {
      this.data = new MatTableDataSource(donne)
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }
}
