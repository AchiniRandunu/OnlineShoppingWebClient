//import { Injectable } from '@angular/core';
//import { CacheService } from './model/cache.service.model';
//import { ConfigService } from '../config/config.service';
//import { CookieService } from 'ngx-cookie-service';
//import { Common } from '../../../shared/Utilities/common';


//@Injectable({
//  providedIn: 'root'
//})
///**Local storage service class */
//export class LocalStorageService implements CacheService {

//  /**
//   * Constructor for the local storage service
//   */
//  constructor( private configService: ConfigService,
//    private cookieService: CookieService) { }


//  /**
//   * Get item from local storage
//   * @param key Key of the item
//   */
// // getItem(key: string): any {


// //   let storageItem = '';

// //   // check whether browser is IE
// //   if (Common.isIEBrowser()) {
// //     storageItem = this.cookieService.get(key);
// //     if (!storageItem) {
// //       return '';
// //     } else {
// //       return JSON.parse(storageItem);
// //     }
// //   } else {
// //     storageItem = sessionStorage.getItem(key);

// //     if (!storageItem) {
// //       return '';
// //     }
// //   }

// //   const object = JSON.parse(storageItem);
// //   const oldTimeStamp = +object.timestamp + object.expiration;
// //   const now = Date.parse(new Date().toUTCString());

// //   /// Check whether item has already expired
// //   if (oldTimeStamp > now) {
// //     return object.value;
// //   } else {
// //     this.clearItem(key);
// //     return '';
// //   }
// //}

// // /**
// //  * Store the item in local storage
// //  * @param key Key of the item
// //  * @param value Value to be stored in local storage
// //  * @param exMins This is the life time of stored item in minutes
// //  */
// // setItem(key: string, value: any, exMins?: number): boolean {

// //   if (exMins === undefined || exMins === null) {
// //     const cacheTime: string = "60";

// //     /// Convert cache time in minutes to milliseconds
// //     exMins = Number.parseInt(cacheTime, 10) * 60 * 1000;

// //   } else {
// //     exMins = exMins * 60 * 1000;
// //   }

// //   if (Common.isIEBrowser()) {
// //     this.cookieService.set(key, JSON.stringify(value), new Date().setTime(new Date().getTime() + exMins), '/');
// //     return true;
// //   } else {
// //     const localStoreKey = '' + key;
// //     const object = {
// //       'value': value,
// //       'expiration': exMins,
// //       'timestamp': Date.parse(new Date().toUTCString())
// //     };

// //     /// Check whether browser supports local storage
// //     if (sessionStorage) {

// //       sessionStorage.setItem(localStoreKey, JSON.stringify(object));
// //       return true;

// //     } else {
// //       //this.loggerService.log(LogLevel.Message, 'No Web Storage support for current browser');
// //       return false;
// //     }
// //   }
// //   return true;
// //}

// // /**
// //  * Clear local storage item
// //  * @param key Key of the item
// //  */
// //clearItem(key: string): boolean {
// //   if (Common.isIEBrowser()) {
// //     this.cookieService.delete(key, '/');
// //   } else {
// //     sessionStorage.removeItem(key);
// //   }
// //     return true;
// //}

//}
