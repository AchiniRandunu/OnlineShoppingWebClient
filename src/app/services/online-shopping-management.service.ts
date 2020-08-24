import { Injectable } from '@angular/core';
import { DataAccessService } from '../services/data-access/data-access.service';
import { environment } from '../../environments/environment.prod';
import { RequestResponse } from '../shared/model/request-response';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OnlineShoppingManagementService {

  constructor(private dataAccessService: DataAccessService, private http: HttpClient)
  { }

  

  public getProductDetails(): Promise<RequestResponse> {

    const promise: Promise<RequestResponse> = new Promise((resolve, reject) => {

      const getProductEndpoint = `${environment.apiHost}${environment.getProductUrl}`;        

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

getProductDetailsNew(): Observable<any> {

  const url = `${environment.apiHost}${environment.getProductUrl}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product`)),
      catchError(this.handleError<any>(`getProduct ids`))
    );
  }

 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProductByID(id: Number): Observable<any> {
   
    const url = `${environment.apiHost}${environment.getProductByIDUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }

  saveOrder(fromBody): Observable<any> {

    const url = `${environment.apiHost}${environment.saveOrderUrl}`;
    return this.http.post<any>(url, fromBody).pipe(
      tap(_ => console.log(`completed save`)),
      catchError(this.handleError<any>(`Failed Save`))
    );
  }

  sendEmail(fromBody): Observable<any> {

    const url = `${environment.apiHost}${environment.sendEmailUrl}`;
    return this.http.post<any>(url, fromBody).pipe(
      tap(_ => console.log(`completed send email`)),
      catchError(this.handleError<any>(`Failed to send email`))
    );
  }

}






