import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCityByCountryIdResponse } from '../models/city/get-all-city-by-country-id-response';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  apiUrl: string = 'http://localhost:8080/customerservice/api/v1/cities';

  constructor(private httpClient: HttpClient) {}

  getByCountryId(
    countryId: string
  ): Observable<GetAllCityByCountryIdResponse[]> {
    return this.httpClient.get<GetAllCityByCountryIdResponse[]>(
      this.apiUrl + '/countryid/' + countryId
    );
  }
}
