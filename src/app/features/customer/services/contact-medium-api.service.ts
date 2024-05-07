import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListResponse } from '../../../shared/models/getListResponse';
import { ContactMediumListModel } from '../models/contact-medium/contact-medium-list-model';
import { Observable } from 'rxjs';
import { UpdateContactMediumRequest } from '../models/contact-medium/update-contact-medium-request';
import { UpdateContactMediumResponse } from '../models/contact-medium/update-contact-medium-response';
import { PostContactMediumRequest } from '../models/contact-medium/post-contact-medium-request';
import { PostContactMediumResponse } from '../models/contact-medium/post-contact-medium-response';

@Injectable({
  providedIn: 'root',
})
export class ContactMediumApiService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<GetListResponse<ContactMediumListModel[]>> {
    return this.httpClient.get<GetListResponse<ContactMediumListModel[]>>(
      'api-url'
    );
  }

  add(contactMedium: PostContactMediumRequest): Observable<PostContactMediumResponse> {
    return this.httpClient.post<PostContactMediumResponse>('api-url', contactMedium);
  }

  delete(id: number) {
    this.httpClient.delete('api-url' + id);
  }

  update(id: number, contactmedium: UpdateContactMediumRequest): Observable<UpdateContactMediumResponse> {
    return this.httpClient.put<UpdateContactMediumResponse>('api-url' + id, contactmedium);
  }
}
