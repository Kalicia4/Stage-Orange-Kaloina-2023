import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, Observable, startWith} from 'rxjs';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{

  chartOpt:any;
  chartOptions:any;
  highcharts: typeof Highcharts = Highcharts;
  periodeArray: any[] = [];
  operateurArray: any[] = [];

  orange: any[] = [];
  telma: any[] = [];
  airtel: any[] = [];

  date: any[] = [];
  message: any[] = [];

  startDate!: Date;
  endDate!: Date;
  emetteur!: string;

  apiUrlPeriode = '';

  parent!:string;
  constructor(private http: HttpClient,private route: ActivatedRoute, private datePipe: DatePipe, private userService: UserService) {

    const storedUserData = localStorage.getItem("currentUser");

    this.route.queryParams.subscribe(params => {
      const user = params['user'];
      const phone = params['phone'];
      console.log('user:', user);
      console.log('Phone:', phone);

      this.emetteur = phone
      this.parent = user

    })



    this.filteredAccount = this.subAccountCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.allSubAccounts.slice())
    );

  }

  ngOnInit(): void {
    this.getSousCompteAPI();
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  updateChartData() {
    this.chartData = [
      { name: 'Message count', data: this.message, color: 'blue' },
      { name: 'Orange', data: this.orange, color: 'orange' },
      { name: 'Telma', data: this.telma, color: 'yellow' },
      { name: 'Airtel', data: this.airtel, color: 'red' },
    ];
  }


  getValueOfDates(){



    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);

    this.apiUrlPeriode = `http://localhost:8080/statistics/periode/${this.emetteur}/${formattedStartDate}/${formattedEndDate}`;

    console.log("Start Date: ", formattedStartDate);
    console.log("End Date: ", formattedEndDate);

    this.getDataFromAPI();

  }

  // message par période et/ou par opérateurs
  barChart(){
    this.chartOptions = {
      chart:{
        type:'line'
      },
      title:{
        text:'statistics'
      },
      xAxis: {
        categories: this.date
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series:{
          stacking:'normal'
        },
        bar:{
          dataLables:{
            enabled : true
          }
        }
      },

      series: this.chartData
    }
  }

  //high chart data
  chartData: { name: string; data: any[]; color: string }[] = [];

  getDataFromAPI() {

    this.http.get(this.apiUrlPeriode).subscribe((data: any) => {
      // Utilisez les données retournées ici

      this.periodeArray = data;
      this.date = [];
      this.message = [];
      this.orange = [];
      this.telma = [];
      this.airtel = [];

      // Vous pouvez également traiter les données ici comme parcourir le tableau
      this.periodeArray.forEach(item => {

        this.date.push(item.date);
        this.message.push(item.messageCount);
        this.orange.push(item.orange);
        this.telma.push(item.telma);
        this.airtel.push(item.airtel);

      });

      this.updateChartData();
      this.barChart();

    }, error => {
      console.error('Une erreur s\'est produite : ', error);
    });
  }

  // SOUS COMPTE

  separatorKeysCodes: number[] = [ENTER, COMMA];
  subAccountCtrl = new FormControl('');
  filteredAccount!: Observable<string[]>;
  accounts: string[] = ['sub-account'];
  allSubAccounts: string[] = [];

  dataSousCompte : any[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  getSousCompteAPI(){

    this.http.get(`http://localhost:8080/statistics/${this.parent}`).subscribe((data: any) => {

    this.allSubAccounts = data; // ou définissez ici la manipulation nécessaire pour extraire les données appropriées de 'data'
    this.filteredAccount = this.subAccountCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.allSubAccounts.slice())
    )

  })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add account
    if (value) {
      this.accounts.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.subAccountCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.accounts.indexOf(fruit);

    if (index >= 0) {
      this.accounts.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.accounts.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.subAccountCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSubAccounts.filter(account => account.toLowerCase().includes(filterValue));
  }

  sousCompte!: any[]

  getValueOfSubAccounts(){
    this.http.get(`http://localhost:8080/statistics/souscompte/${this.emetteur}`).subscribe((data: any) => {

      this.sousCompte = []
      this.dataSousCompte = []

      console.log("avant ajout valeur :", this.sousCompte, this.dataSousCompte)

      for (let item of data) {
          for (let key in item) {
            if (this.accounts.includes(key)) {
              this.dataSousCompte.push(item[key]);
              this.sousCompte.push(key)

              console.log("pendant l'ajout valeur :", this.sousCompte, this.dataSousCompte)

            }
          }
      }

      console.log("fin ajout valeur :", this.sousCompte, this.dataSousCompte)
       this.updateChartDataSousCompte();

       console.log(this.chartDataSousCompte)
       this.barChartSubAccount();
    })

  }

  updateChartDataSousCompte(){
    this.chartDataSousCompte =  [
      { name: 'Message count', data: this.dataSousCompte },

    ];
  }

  // message per sub-account
  barChartSubAccount() {
  this.chartOpt = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Statistics'
    },
    xAxis: {
      categories: this.sousCompte
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      },
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: this.chartDataSousCompte
  };
}

//high chart data
chartDataSousCompte: { name: string; data: any[] }[] = [];


getAccounts(){
  this.getValueOfSubAccounts()
}


}
