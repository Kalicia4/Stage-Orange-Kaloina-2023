import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as Highcharts from 'highcharts/highstock';


@Component({
  selector: 'app-admin-statistic',
  templateUrl: './admin-statistic.component.html',
  styleUrls: ['./admin-statistic.component.css']
})
export class AdminStatisticComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private datePipe: DatePipe,private http: HttpClient){}

  ngOnInit(): void{
    this.getstat();
    this.getAccount();
  }


  selectedValue: string = '';
  comptes: any[] = [""]

  getAccount() {
    // Faites une requête HTTP pour récupérer les données de la base de données
    this.http.get<any[]>(`http://localhost:8080/admin/account`).subscribe((data) => {
      this.comptes = this.comptes.concat(data);
    }, (error) => {
      console.error('Une erreur s\'est produite : ', error);
    });
  }

  // BARCHART
  charOptions: any;
  highcharts: typeof Highcharts = Highcharts;

  startDate!: Date;
  endDate!: Date;
  url!:string;

  date: any[] = [];
  message: any[] = [];
  orange: any[] = [];
  telma: any[] = [];
  airtel: any[] = [];

  urldata: any[] = [];


  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  barChart(){
    this.charOptions = {
      chart:{
        type:'column'
      },
      title:{
        Text:'this is a text'
      },
      xAxis:{
        categories:this.date
      },
      series:this.chartData
    }
  }

  chartData: { name: string; data: any[]; color: string }[] = [];

  async comparaison(): Promise<string> {
    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);
    let tel: string | undefined;

    // Initialize tel to an empty string before the try-catch block
    tel = '';

    if (this.selectedValue !== "") {
      try {
        // Use await to wait for the HTTP GET request to complete
        const response = await this.http.get(`http://localhost:8080/admin/${this.selectedValue}`, {responseType: 'text'}).toPromise();
        tel = response?.valueOf()
      } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
        tel = ''; // Set tel to an empty string if an error occurs
      }
    }

    console.log('Selected value:', this.selectedValue);
    console.log('Tel:', tel);

    // Construct the URL based on the presence of tel
    let url: string;
    if (tel) {
      url = `http://localhost:8080/admin/${tel}/${formattedStartDate}/${formattedEndDate}`;
    } else {
      url = `http://localhost:8080/admin/periode/${formattedStartDate}/${formattedEndDate}`;
    }

    return url;
  }

  selected!:string
  souscomptes!: any[]
  isDisabled = true

  getSubAccount(){

    if(this.selectedValue == ""){
      this.isDisabled = true
      alert("please select an account")
    }else{
      this.souscomptes = [""]
      this.http.get<any[]>(`http://localhost:8080/admin/subAccount/${this.selectedValue}`).subscribe((data) => {
      this.souscomptes = this.souscomptes.concat(data);
      }, (error) => {
      console.error('Une erreur s\'est produite : ', error);
      });

      this.isDisabled = false
    }

    console.log("remplissage sous-compte")
  }

  async getstat(){

    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);

    if(this.selected == "" || this.selected == undefined){
      console.log("tsy misy sous-compte")
      this.url = await this.comparaison()

    }else{
      this.url = `http://localhost:8080/admin/sous_compte/${this.selected}/${formattedStartDate}/${formattedEndDate}`;
    }

    console.log(this.url)
    console.log(this.selected)
    this.datestat()

  }

  datestat(){

    this.http.get(this.url).subscribe((data: any) => {
      // Utilisez les données retournées ici

      this.urldata = data;
      this.date = [];
      this.message = [];
      this.orange = [];
      this.telma = [];
      this.airtel = [];


      // Vous pouvez également traiter les données ici comme parcourir le tableau
      this.urldata.forEach(item => {

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

  name:string = 'Message'
  datachart: number = 0
  color:string = 'blue';

  radioChange(event: any) {
    if (event.value === 'orange') {
      this.name = 'Orange'
      this.datachart = 1
      this.color = 'orange'
    } else if (event.value === 'telma') {
      this.name = 'Telma'
      this.datachart = 2
      this.color = 'yellow'
    }else if (event.value === 'airtel') {
      this.name = 'Airtel'
      this.datachart = 3
      this.color = 'red'
    }
  }



  updateChartData() {
    if(this.datachart == 1){
      this.chartData = [
        { name: this.name, data: this.orange, color:this.color},
      ];
    }else if(this.datachart == 2){
      this.chartData = [
        { name: this.name, data: this.telma, color:this.color},
      ];
    }else if(this.datachart == 3){
      this.chartData = [
        { name: this.name, data: this.airtel, color:this.color},
      ];
    }else{
      this.chartData = [
        { name: this.name, data: this.message, color:this.color},
      ];
    }

  }

}
