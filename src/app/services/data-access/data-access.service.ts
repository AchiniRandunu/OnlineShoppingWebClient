import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Constants } from '../../shared/constants';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { ConfigService } from '../../shared/services/config/config.service';



@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  userToken: string;
  authToken: string;


  /**
   *Creates an instance of DataAccessService.
   */
  constructor(private http: HttpClient,
    private userAuthenticationService: UserAuthenticationService,
    private configService: ConfigService
  ) {
   
  }

  /// get directly without access token or login token method
  public getDirect(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    const options = { headers: headers, params: params };
    return this.http.get(url, options);
  }

  /// get method
  public get(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    let options;   
    options = { headers: headers, params: params };
    return this.http.get(url, options);
  }

  

  public updateRetryAttempts(url: string, data: any, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    headers = headers ? headers.set('Authorization', 'Bearer ' +
      this.userAuthenticationService.currentUserObservable.value.AuthToken) :
      new HttpHeaders({
        'Authorization': 'Bearer ' +
          this.userAuthenticationService.currentUserObservable.value.AuthToken
      });
    const options = { headers: headers };
    return this.http.post(url, data, options);
  }

  // post method
  public post(url: string, data: any, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    if (this.userAuthenticationService.currentUserObservable.value &&
      this.userAuthenticationService.currentUserObservable.value.AuthToken) {
      headers = headers ? headers.set('Authorization',
        this.userAuthenticationService.currentUserObservable.value.AuthToken)
        : new HttpHeaders().set(
          'Authorization',
          this.userAuthenticationService.currentUserObservable.value.AuthToken
        );
    } else {
      headers = headers ? headers.set('Authorization', 'bearer ' + this.userToken) :
        new HttpHeaders({ 'Authorization': 'bearer ' + this.userToken });

      headers = headers ? headers.set('gwAccessToken', this.authToken) :
        new HttpHeaders({ 'gwAccessToken': this.authToken });
    }
    const options = {
      headers: headers,
      params: params ? params : {}
    };
    return this.http.post(url, data, options);
  }  

  

  public accessTokenPost(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .append('Authorization', 'Basic ' + btoa('my-trusted-client:secret'));

    return this.http.post(url, data, { headers: headers });
  }

  // put method
  public put(url: string, data: any, params?: HttpParams, headers?: HttpHeaders): Observable<any> {

    if (this.userAuthenticationService.currentUserObservable.value &&
      this.userAuthenticationService.currentUserObservable.value.AuthToken) {

      headers = headers ? headers.set('Authorization',
        this.userAuthenticationService.currentUserObservable.value.AuthToken)
        : new HttpHeaders().set(
          'Authorization',
          this.userAuthenticationService.currentUserObservable.value.AuthToken
        );

    } else {
      headers = headers ? headers.set('Authorization', 'bearer ' + this.userToken) :
        new HttpHeaders({ 'Authorization': 'bearer ' + this.userToken });
    }
    const options = {
      headers: headers,
      params: params ? params : {}
    };

    return this.http.put(url, data, options);
  }

  logError(error) {
    /* tslint:disable */
    console.log(error); /* tslint:enable */
  }




}
