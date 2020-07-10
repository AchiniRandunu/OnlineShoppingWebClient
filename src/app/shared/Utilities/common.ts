import { AbstractControl } from '@angular/forms';

export class Common {

  // this function removes single error
  public static removeError(control: AbstractControl, error: string) {
    const err = control.errors; // get control errors
    if (err) {
      delete err[error]; // delete your own error
      if (!Object.keys(err).length) { // if no errors left
        control.setErrors(null); // set control errors to null making it VALID
      } else {
        control.setErrors(err); // controls got other errors so set them back
      }

    }
  }

  // return true if broswer is IE
  public static isIEBrowser(): boolean {
        /* tslint:disable */ return !!window['MSInputMethodContext'] && !!document['documentMode']; /* tslint:enable */
  }
}

export class BreadcrumbObject {
  BreadcrumbList: Breadcrumb[];

  constructor(BreadcrumbList: Breadcrumb[]) {
    this.BreadcrumbList = BreadcrumbList;
  }
}

export class Breadcrumb {
  PageName: string;
  Url: string;
  HasChildItem: boolean;

  constructor(PageName: string, Url: string, HasChildItem: boolean) {
    this.PageName = PageName;
    this.Url = Url;
    this.HasChildItem = HasChildItem;
  }
}

