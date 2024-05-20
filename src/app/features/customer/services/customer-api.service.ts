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
import { CheckMernisRequest } from '../models/customer/check-mernis-request';
import { DeletedCustomerResponse } from '../models/customer/delete-customer-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private apiUrl = environment.apiUrl + "/customerservice/api/v1/individualcustomers"

  constructor(private httpClient: HttpClient) {}

  get(): Observable<GetListResponse<CustomerListModel[]>> {
    return this.httpClient.get<GetListResponse<CustomerListModel[]>>('api-url');
  }

  getById(customerId: string): Observable<GetCustomerResponse> {
    return this.httpClient.get<GetCustomerResponse>(
      this.apiUrl + '/' + customerId
    );
  }

  isIndividualCustomerExistsByNationalityId(
    nationalityId: string
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.apiUrl + '/nationalityid?nationalityId=' + nationalityId
    );
  }

  add(customer: PostCustomerRequest): Observable<PostCustomerResponse> {
    return this.httpClient.post<PostCustomerResponse>(this.apiUrl, customer);
  }

  delete(id: string): Observable<DeletedCustomerResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<DeletedCustomerResponse>(url);
  }

  update(
    id: string,
    customer: UpdateCustomerRequest
  ): Observable<UpdateCustomerResponse> {
    let newUrl = this.apiUrl + '/' + id;
    console.log(newUrl);

    return this.httpClient.put<UpdateCustomerResponse>(newUrl, customer);
  }

  checkMernis(data: CheckMernisRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(this.apiUrl + '/checkmernis', data);
  }
}
