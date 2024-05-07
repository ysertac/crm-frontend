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

  get(): Observable<GetListResponse<AddressListModel[]>> {
    return this.httpClient.get<GetListResponse<AddressListModel[]>>('api-url');
  }

  add(address: PostAddressRequest): Observable<PostAddressResponse> {
    return this.httpClient.post<PostAddressResponse>('api-url', address);
  }

  delete(id: number) {
    this.httpClient.delete('api-url' + id);
  }

  update(id: number, address: UpdateAddressRequest): Observable<UpdateAddressResponse> {
    return this.httpClient.put<UpdateAddressResponse>('api-url' + id, address);
  }
}
