import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Config } from './model/config.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configUrl = 'assets/config.json';
  private appConfig: Config;

  constructor(private http: HttpClient, ) {

  }

  public get config(): Config {
    return this.appConfig;
  }

  /// this method will be called in app module since this service sould start first
  public loadConfig(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {

      this.get(this.configUrl).toPromise()
        .then(
          (data: Config) => {
            this.appConfig = { ...data };
            resolve(true);
          },
          (error) => {
                    /* tslint:disable */ console.log(error); /* tslint:enable */
            reject();
          }
        );


    });
    return promise;
  }

  /// get method
  /**
   * privat get method to config service to avoid cyclic dependancies
    */
  private get(url: string, params?: HttpParams): Observable<any> {

    return this.http.get(url)
      .pipe(
        retry(3),
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  /// error handling method
  private handleError(error: any) {

    return throwError(error);
  }
}
