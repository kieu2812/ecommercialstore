import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class MystoreFormService {

  countryUrl=environment.baseUrl+"/countries";
  stateUrl = environment.baseUrl+"/states";
  constructor(private httpClient: HttpClient) { }

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

  getAllCountries(): Observable<Country[]>{
      return this.httpClient.get<GetCountryResponse>(this.countryUrl)
                .pipe(
                  tap( console.log),
                  map( response => response._embedded.countries)
                );
  }

  searchStatesByCountry( countryCode: String): Observable<State[]>{
    const searchStateUrl: string = `${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetStateResponse>(searchStateUrl)
            .pipe(
              map( response=> response._embedded.states)
            );
  }
}

interface GetCountryResponse{
  _embedded: {
    countries: Country[]
  }
}

interface GetStateResponse{
  _embedded:{
    states: State[]
  }
}