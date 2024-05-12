import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListResponse } from '../../../shared/models/getListResponse';
import { ContactMediumListModel } from '../models/contact-medium/contact-medium-list-model';
import { Observable } from 'rxjs';
import { UpdateContactMediumRequest } from '../models/contact-medium/update-contact-medium-request';
import { UpdateContactMediumResponse } from '../models/contact-medium/update-contact-medium-response';
import { PostContactMediumRequest } from '../models/contact-medium/post-contact-medium-request';
import { PostContactMediumResponse } from '../models/contact-medium/post-contact-medium-response';
import { GetContactMediumResponse } from '../models/contact-medium/get-contact-medium-response';

@Injectable({
  providedIn: 'root',
})
export class ContactMediumApiService {
  private apiUrl: string =
    'http://localhost:8080/customerservice/api/v1/contact-medium';
  constructor(private httpClient: HttpClient) {}

  get(): Observable<GetListResponse<ContactMediumListModel[]>> {
    return this.httpClient.get<GetListResponse<ContactMediumListModel[]>>(
      'api-url'
    );
  }

  add(
    contactMedium: PostContactMediumRequest
  ): Observable<PostContactMediumResponse> {
    return this.httpClient.post<PostContactMediumResponse>(
      this.apiUrl,
      contactMedium
    );
  }

  delete(id: number) {
    this.httpClient.delete('api-url' + id);
  }

  update(
    id: string,
    contactmedium: UpdateContactMediumRequest
  ): Observable<UpdateContactMediumResponse> {
    return this.httpClient.put<UpdateContactMediumResponse>(
      this.apiUrl + '/' + id,
      contactmedium
    );
  }

  getById(id: string): Observable<GetContactMediumResponse> {
    return this.httpClient.get<GetContactMediumResponse>(
      this.apiUrl + '/' + id
    );
  }
}
