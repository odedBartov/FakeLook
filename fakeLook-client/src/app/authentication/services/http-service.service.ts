import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  Login(userName, password){
    return this.http.get(`http://localhost:1000/authentication/login?userName=${userName}&password=${password}`,
    {observe: 'response'}).pipe(tap((res: any) => {   
      environment.secretToken = res.headers.get('access-token');
      environment.userName = res.body.userName;
    }))
  }

  SignUp(userName, password, email){
    return this.http.get(`http://localhost:1000/authentication/signUp?userName=${userName}&password=${password}&email=${email}`);
  }
}
