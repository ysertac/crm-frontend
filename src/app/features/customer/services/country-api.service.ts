import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCountryResponse } from '../models/country/get-all-country-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  private apiUrl = environment.apiUrl + "/customerservice/api/v1/countries";

  constructor(private httpClient: HttpClient) {}

  get(): Observable<GetAllCountryResponse[]> {
    return this.httpClient.get<GetAllCountryResponse[]>(this.apiUrl);
  }
}
