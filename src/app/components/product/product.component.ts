import { Component, OnInit } from '@angular/core';
import { OnlineShoppingManagementService } from '../../services/online-shopping-management.service';
import { RequestResponse } from '../../shared/model/request-response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  userId: Number;
  allProductDetails = [];
  productDetails = []; 



  constructor(private onlineShoppingManagementService: OnlineShoppingManagementService,
  private route:Router) {

  }

  ngOnInit() {

    this.getProductDetails();

  }

  //Get Product Details
  async getProductDetails() {


    const response: RequestResponse = await this.onlineShoppingManagementService
      .getProductDetails();
    if (response != null && response.data != null) {
      console.log(response);
      this.allProductDetails = response.data;
      this.productDetails = this.allProductDetails;
      
    }


  }

  //Get Product Details relevant to thecategory
  public getProductsByCategory(type) {

    let categoryProductDetails = [];
   // let categoryTwoProductDetails = [];
    switch (type) {
      case "0":

        this.productDetails = [];
        this.productDetails = this.allProductDetails;
        break;

      case "1":
        this.productDetails = [];
        this.allProductDetails.forEach(function (value) {
          if (value.categoryID.toString() == "1") {
            categoryProductDetails.push(value);
          }
        });

        this.productDetails = categoryProductDetails;
        break;

      case "2":
        this.productDetails = [];
        this.allProductDetails.forEach(function (value) {
          if (value.categoryID.toString() == "2") {
            categoryProductDetails.push(value);
          }
        });

        this.productDetails = categoryProductDetails;
        break;

    }
  }


  public addToCart(productID: Number) {
    sessionStorage.setItem('id', productID.toString());
    this.route.navigateByUrl('/cart');   

  }
}
