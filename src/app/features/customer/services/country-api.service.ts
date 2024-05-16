import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCountryResponse } from '../models/country/get-all-country-response';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  private apiUrl: string =
    'http://localhost:8080/customerservice/api/v1/countries';

  constructor(private httpClient: HttpClient) {}

  get(): Observable<GetAllCountryResponse[]> {
    return this.httpClient.get<GetAllCountryResponse[]>(this.apiUrl);
  }
}
