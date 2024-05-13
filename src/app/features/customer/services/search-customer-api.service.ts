import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostSearchCustomerRequest } from '../models/search/post-search-customer-request';
import { PostSearchCustomerResponse } from '../models/search/post-search-customer-response';

@Injectable({
  providedIn: 'root',
})
export class SearchCustomerApiService {
  private apiUrl = 'http://localhost:8082/searchservice/api/v1/searchcustomer';

  constructor(private httpClient: HttpClient) {}

  search(data: PostSearchCustomerRequest): Observable<PostSearchCustomerResponse[]> {
    return this.httpClient.post<PostSearchCustomerResponse[]>(
      this.apiUrl,
      data
    );
  }
}
