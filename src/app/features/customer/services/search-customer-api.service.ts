import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostSearchCustomerRequest } from '../models/search/post-search-customer-request';
import { GetAllSearchCustomerResponse } from '../models/search/get-all-search-customer-response';
import { GetListResponse } from '../../../shared/models/getListResponse';

@Injectable({
  providedIn: 'root',
})
export class SearchCustomerApiService {
  apiUrl = 'http://localhost:8082/searchservice/api/v1/searchcustomer?';

  constructor(private httpClient: HttpClient) {}

  search(
    data: PostSearchCustomerRequest
  ): Observable<GetListResponse<GetAllSearchCustomerResponse>> {
    if (data.customerNumber != null && !!data.customerNumber) {
      this.apiUrl = this.apiUrl + 'customerNumber=' + data.customerNumber + '&';
    }
    if (data.nationalityId != null && !!data.nationalityId) {
      this.apiUrl = this.apiUrl + 'nationalityId=' + data.nationalityId + '&';
    }
    if (data.accountNumber != null && !!data.accountNumber) {
      this.apiUrl = this.apiUrl + 'accountNumber=' + data.accountNumber + '&';
    }
    if (data.mobilePhone != null && !!data.mobilePhone) {
      this.apiUrl = this.apiUrl + 'mobilePhone=' + data.mobilePhone + '&';
    }
    if (data.firstName != null && !!data.firstName) {
      this.apiUrl = this.apiUrl + 'firstName=' + data.firstName + '&';
    }
    if (data.lastName != null && !!data.lastName) {
      this.apiUrl = this.apiUrl + 'lastName=' + data.lastName + '&';
    }
    if (data.orderNumber != null && !!data.orderNumber) {
      this.apiUrl = this.apiUrl + 'orderNumber=' + data.orderNumber + '&';
    }
    if (data.page >= 0) {
      this.apiUrl = this.apiUrl + 'page=' + data.page + '&';
    }
    if (data.size >= 0) {
      this.apiUrl = this.apiUrl + 'size=' + data.size + '&';
    }

    console.log(this.apiUrl);
    return this.httpClient.get<GetListResponse<GetAllSearchCustomerResponse>>(
      this.apiUrl
    );
  }
}
