import { GetListResponse } from './../../../shared/models/getListResponse';
import { AddressListModel } from './../models/address/address-list-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostAddressRequest } from '../models/address/post-address-request';
import { PostAddressResponse } from '../models/address/post-address-response';
import { UpdateAddressRequest } from '../models/address/update-address-request';
import { UpdateAddressResponse } from '../models/address/update-address-response';

@Injectable({
  providedIn: 'root',
})
export class AddressApiService {
  constructor(private httpClient: HttpClient) {}

  get(page: number,size: number,customerId: string | null): Observable<GetListResponse<AddressListModel>> {
    if(customerId == null){
      return this.httpClient.get<GetListResponse<AddressListModel>>('http://localhost:8080/customerservice/api/v1/addresses?page=' + page + '&size=' + size);
    }
    else{
      return this.httpClient.get<GetListResponse<AddressListModel>>('http://localhost:8080/customerservice/api/v1/addresses?page=' + page + '&size=' + size + '&customerId=' + customerId);
    }
  }

  add(address: PostAddressRequest): Observable<PostAddressResponse> {
    return this.httpClient.post<PostAddressResponse>('http://localhost:8080/customerservice/api/v1/addresses', address);
  }

  delete(id: number) {
    this.httpClient.delete('api-url' + id);
  }

  update(id: number, address: UpdateAddressRequest): Observable<UpdateAddressResponse> {
    return this.httpClient.put<UpdateAddressResponse>('api-url' + id, address);
  }

}
