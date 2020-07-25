import { Injectable } from '@angular/core';
import { DataAccessService } from '../services/data-access/data-access.service';
import { ConfigService } from '../shared/services/config/config.service';
import { Constants } from '../shared/constants';
import { environment } from '../../environments/environment.prod';
import { RequestResponse } from '../shared/model/request-response';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OnlineShoppingManagementService {

  constructor(private dataAccessService: DataAccessService,
    private config: ConfigService, 
    private configService: ConfigService,
    private http: HttpClient,) { }

  

  public getProductDetails(): Promise<RequestResponse> {

    const promise: Promise<RequestResponse> = new Promise((resolve, reject) => {
     
      const getProductEndpoint = "http://localhost:31258/api/Products/GetAllActiveProducts";
      //${environment.apiHost}${this.configService.config.GetProductUrl}`;

      return this.dataAccessService.get(getProductEndpoint)
          .toPromise()
        .then(result => {
          if (result.statusCode) {
            reject(result.errorDescription);
          } else {
            resolve(result);
          }     
          
          });
    });

    return promise;
  }

  public getProductByID(productId: Number): Promise<RequestResponse> {

    const promise: Promise<RequestResponse> = new Promise((resolve, reject) => {

      const getProductByIDEndpoint = "http://localhost:31258/api/Products/GetProductById/" + productId;
      //${environment.apiHost}${this.configService.config.GetProductUrl}`;
      var s = this.dataAccessService.get(getProductByIDEndpoint)
        .toPromise()
        .then(result => {
          if (result.statusCode) {
            reject(result.errorDescription);
          } else {
            resolve(result);
          }

        });
      return s;
    });

    return promise;
  }

  //search(productId: Number): Observable<RequestResponse> {
    //let apiURL = "http://localhost:31258/api/Products/GetProductById/" + productId;
    //`${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
   // return this.http.get(apiURL)
      //.map(res => {
        
       // return res.json().results.map(item => {
          
          //return new RequestResponse(
          //  item.data,
          //  item.errorDescription,
          //  item.statusCode
           
          //);
       // });
      //});
  //}

  searchNew(productId: Number): Observable<any> {
    let apiURL = "http://localhost:31258/api/Products/GetProductById/" + productId;
    return this.dataAccessService.get(apiURL)
    //return this.http.get(apiURL)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProduct(id: number): Observable<any> {
    let apiUrl = "http://localhost:31258/api/Products/GetProductById";
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }
}






