import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressBillingAccountApiService {
  private apiUrl = `${environment.apiUrl}/customerservice/api/v1/addressbillingaccounts`;

  constructor(private httpClient: HttpClient) {}
}
