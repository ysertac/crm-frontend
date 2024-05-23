import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllBillingAccountsResponse } from '../models/billing-account/get-all-billing-accounts-response';
import { GetListResponse } from '../../../shared/models/getListResponse';

@Injectable({
  providedIn: 'root',
})
export class BillingAccountApiService {
  private apiUrl = `${environment.apiUrl}/customerservice/api/v1/billingaccounts`;

  constructor(private httpClient: HttpClient) {}

  getByCustomerId(
    customerId: string | null
  ): Observable<Array<GetAllBillingAccountsResponse>> {
    return this.httpClient.get<Array<GetAllBillingAccountsResponse>>(
      `${this.apiUrl}/customerid/${customerId}`
    );
  }
}
