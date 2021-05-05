import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MystoreFormService {


  constructor() { }

  getMonthsForExpireMonth(startMonth: number): Observable<number[]>{
    let data:number[]=[];
    for(let m=startMonth; m<=12; m++){
      data.push(m);
    }
    return of(data);
  }
  getYearForExpireYear():Observable<number[]>{
    let data:number[]=[];
    const currentYear = new Date().getFullYear();
    for(let y=currentYear; y<= currentYear+10;y++){
       data.push(y);
    }
    return of(data);
  }
}
