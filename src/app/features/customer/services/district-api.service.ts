import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllDistrictByCityIdResponse } from '../models/District/get-all-district-by-city-id-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DistrictApiService {
  private apiUrl = environment.apiUrl + "/customerservice/api/v1/districts"

  constructor(private httpClient: HttpClient) {}

  getByCityId(cityId: string): Observable<GetAllDistrictByCityIdResponse[]> {
    return this.httpClient.get<GetAllDistrictByCityIdResponse[]>(
      this.apiUrl + '/cityid/' + cityId
    );
  }
}
