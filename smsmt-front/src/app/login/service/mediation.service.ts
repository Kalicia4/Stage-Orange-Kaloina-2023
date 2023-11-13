import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediationService {

  public sharedData!: any;
  constructor() { }

  getsharedData(){
    return this.sharedData
  }

  setsharedData(data : any){
    this.sharedData = data
  }
}
