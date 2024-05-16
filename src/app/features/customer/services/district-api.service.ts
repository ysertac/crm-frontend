import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllDistrictByCityIdResponse } from '../models/District/get-all-district-by-city-id-response';

@Injectable({
  providedIn: 'root',
})
export class DistrictApiService {
  apiUrl: string = 'http://localhost:8080/customerservice/api/v1/districts';

  constructor(private httpClient: HttpClient) {}

  getByCityId(cityId: string): Observable<GetAllDistrictByCityIdResponse[]> {
    return this.httpClient.get<GetAllDistrictByCityIdResponse[]>(
      this.apiUrl + '/cityid/' + cityId
    );
  }
}
