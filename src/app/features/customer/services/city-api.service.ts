import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCityByCountryIdResponse } from '../models/city/get-all-city-by-country-id-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  private apiUrl = environment.apiUrl + "/customerservice/api/v1/cities" 
  

  constructor(private httpClient: HttpClient) {}

  getByCountryId(
    countryId: string
  ): Observable<GetAllCityByCountryIdResponse[]> {
    return this.httpClient.get<GetAllCityByCountryIdResponse[]>(
      this.apiUrl + '/countryid/' + countryId
    );
  }
}
