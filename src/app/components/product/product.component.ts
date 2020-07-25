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
  AllProductDetails = [];
  ProductDetails = [];



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
      this.AllProductDetails = response.data;
      this.ProductDetails = this.AllProductDetails;
      console.log(this.ProductDetails);
    }


  }

  //Get Product Details relevant to thecategory
  public getProductsByCategory(type) {

    let CategoryProductDetails = [];
    switch (type) {
      case "0":

        this.ProductDetails = [];
        this.ProductDetails = this.AllProductDetails;
        break;

      case "1":
        this.ProductDetails = [];
        this.AllProductDetails.forEach(function (value) {
          if (value.categoryID.toString() == "1") {
            CategoryProductDetails.push(value);
          }
        });

        this.ProductDetails = CategoryProductDetails;
        break;

      case "2":
        this.ProductDetails = [];
        this.AllProductDetails.forEach(function (value) {
          if (value.categoryID.toString() == "2") {
            CategoryProductDetails.push(value);
          }
        });

        this.ProductDetails = CategoryProductDetails;
        break;

    }
  }


  public addToCart(productID: Number) {
    sessionStorage.setItem('id', productID.toString());
    this.route.navigateByUrl('/cart');   

  }
}
