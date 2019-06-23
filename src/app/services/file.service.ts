import {Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class FileService {
  private fileUrl = 'http://localhost:3000/file';

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient
  ) {
  }

  uploadAvatar(avatar) {
    return this.httpClient.post(`${this.fileUrl}/avatar`, avatar).toPromise();
  }
}
