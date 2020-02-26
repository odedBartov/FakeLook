import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NavigatorService } from './navigator.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  tokenHeader: HttpHeaders;
  constructor(private httpClient: HttpClient, private navigatorService: NavigatorService) {
    this.tokenHeader = new HttpHeaders({ 'access-token': environment.secretToken });
  }

  getWithHeaders(url) {
    return this.httpClient.get(environment.URL + url, { headers: this.tokenHeader })
      .pipe(tap(res => {
      }, this.errorFunction));
  }

  postWithHeaders(url, body) {
    return this.httpClient.post(environment.URL + url, body, { headers: this.tokenHeader })
      .pipe(tap(res => {
      }, this.errorFunction));
  }

  deleteWithHeaders(url) {
    return this.httpClient.delete(environment.URL + url, { headers: this.tokenHeader })
      .pipe(tap(res => { }, this.errorFunction));
  }

  errorFunction() {
    return err => {
      alert(err.error);
      if (err.status == 403) {
        this.navigatorService.navigateToLogin();
      }
    }
  }


}
