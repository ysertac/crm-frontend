import { PostCustomerRequest } from './../models/customer/post-customer-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerListModel } from '../models/customer/customer-list-model';
import { GetListResponse } from '../../../shared/models/getListResponse';
import { Observable } from 'rxjs';
import { PostCustomerResponse } from '../models/customer/post-customer-response';
import { UpdateCustomerRequest } from '../models/customer/update-customer-request';
import { UpdateCustomerResponse } from '../models/customer/update-customer-response';
import { GetCustomerResponse } from '../models/customer/get-customer-response';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private apiUrl: string =
    'http://localhost:8080/customerservice/api/v1/individualcustomers';
  constructor(private httpClient: HttpClient) {}

  get(): Observable<GetListResponse<CustomerListModel[]>> {
    return this.httpClient.get<GetListResponse<CustomerListModel[]>>('api-url');
  }

  getById(customerId: string): Observable<GetCustomerResponse> {
    return this.httpClient.get<GetCustomerResponse>('' + customerId);
  }

  add(customer: PostCustomerRequest): Observable<PostCustomerResponse> {
    return this.httpClient.post<PostCustomerResponse>(this.apiUrl, customer);
  }

  delete(id: number) {
    this.httpClient.delete('api-url' + id);
  }

  update(
    id: number,
    customer: UpdateCustomerRequest
  ): Observable<UpdateCustomerResponse> {
    return this.httpClient.put<UpdateCustomerResponse>(
      'api-url' + id,
      customer
    );
  }
}
