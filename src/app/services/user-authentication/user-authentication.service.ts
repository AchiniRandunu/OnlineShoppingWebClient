import { Injectable } from '@angular/core';
import { User } from '../../components/user/model/user';
import { Constants } from '../../shared/constants';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {


  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(new User());


  /**
   *Creates an instance of UserAuthenticationService.
   */
  constructor() {
    let _currentUser: User;
    /// Check whether current user is available in local storage
    if (localStorage) {

      //_currentUser = this.localStorage.getItem(Constants.userSessionKey);

      if (_currentUser) {

        this.currentUserSubject.next(_currentUser);

      } else {
        _currentUser = new User();
      }
    } 
  }


  /**
   * Set current user
   */
  public set currentUser(user: User) {
    // this._currentUser = user;
    this.currentUserSubject.next(user);

    if (user) {
      //this.localStorage.setItem(Constants.userSessionKey, user, Constants.defaultSessionExpirationTimeMin);
    } else {
      /// Clear local storage if empty
      //this.localStorage.clearItem(Constants.userSessionKey);
    }
  }


  /**
   * Returns observable to get current user details
   */
  public get currentUserObservable(): BehaviorSubject<User> {

    /// If behaviour subject is not set check session storage for user
    // if (this.currentUserSubject.value == null) {
    let _currentUser: User;

    //_currentUser = this.localStorage.getItem(Constants.userSessionKey);

    if (_currentUser) {

      this.currentUserSubject.next(_currentUser);

    } else {
      this.currentUserSubject.next(new User());
    }
    // }
    return this.currentUserSubject;
  }

}
