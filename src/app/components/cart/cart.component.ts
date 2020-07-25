import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/model/product';
import { Item } from '../product/model/item';
import { OnlineShoppingManagementService } from '../../../app/services/online-shopping-management.service';
import { RequestResponse } from '../../shared/model/request-response';
import { observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private items: Item[] = [];
  private total: number = 0;
  product = new Product();
  result: any;

  data: any[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private onlineShoppingManagementService: OnlineShoppingManagementService
  ) {
    //this.activatedRoute.params.subscribe(params => {
    //  var id = params['id'];
    //  if (id) {
    //    //this.onlineShoppingManagementService.getProduct(id)
    //    //  .subscribe((res: any) => {
    //    //    this.data = res.data;
    //    //    //console.log(this.data);
    //    //  }, err => {
    //    //    console.log(err);
    //    //  });


    //    console.log(this.data);
    //    var item: Item = {

    //      product: this.data,
    //      quantity: 1
    //    };


    //    if (localStorage.getItem('cart') == null) {
    //      let cart: any = [];
    //      cart.push(JSON.stringify(item));
    //      localStorage.setItem('cart', JSON.stringify(cart));
    //    } else {
    //      let cart: any = JSON.parse(localStorage.getItem('cart'));
    //      let index: number = -1;
    //      for (var i = 0; i < cart.length; i++) {
    //        let item: Item = JSON.parse(cart[i]);
    //        if (item.product.productID == id) {
    //          index = i;
    //          break;
    //        }
    //      }
    //      if (index == -1) {
    //        cart.push(JSON.stringify(item));
    //        localStorage.setItem('cart', JSON.stringify(cart));
    //      } else {
    //        let item: Item = JSON.parse(cart[index]);
    //        item.quantity += 1;
    //        cart[index] = JSON.stringify(item);
    //        localStorage.setItem("cart", JSON.stringify(cart));
    //      }
    //    }
    //    this.loadCart();
    //  } else {
    //    this.loadCart();
    //  }
    //});
      
    
  }

  ngOnInit() {
   
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        //this.doSearch(id);

        var d = this.getProductDetails(id).then();

        //console.log(d);
        //var item: Item = {

        //  product: this.data,         
        //  quantity: 1
        //};


        //if (localStorage.getItem('cart') == null) {
        //  let cart: any = [];
        //  cart.push(JSON.stringify(item));
        //  localStorage.setItem('cart', JSON.stringify(cart));
        //} else {
        //  let cart: any = JSON.parse(localStorage.getItem('cart'));
        //  let index: number = -1;
        //  for (var i = 0; i < cart.length; i++) {
        //    let item: Item = JSON.parse(cart[i]);
        //    if (item.product.productID == id) {
        //      index = i;
        //      break;
        //    }
        //  }
        //  if (index == -1) {
        //    cart.push(JSON.stringify(item));
        //    localStorage.setItem('cart', JSON.stringify(cart));
        //  } else {
        //    let item: Item = JSON.parse(cart[index]);
        //    item.quantity += 1;
        //    cart[index] = JSON.stringify(item);
        //    localStorage.setItem("cart", JSON.stringify(cart));
        //  }
        //}
        //this.loadCart();
        //} else {
        //  this.loadCart();
        //}
      }
    });
  }




  async getProductDetails(id: Number) {
    const productResponse: RequestResponse = await this.onlineShoppingManagementService
      .getProductByID(id);
    this.product = productResponse.data;
   // console.log(this.product);

    console.log(this.product);
    var item: Item = {

      product: this.product,
      quantity: 1
    };


    if (localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.productID == id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item: Item = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
    this.loadCart();
    return this.product;
   
  }


  doSearch(id: Number) {
   
    const subscription = this.onlineShoppingManagementService.searchNew(id).subscribe(data => {
      console.log(data.data);
      this.result = data.data;

      //return this.result;
    });

    setTimeout(() => subscription.unsubscribe(), 50000);

    
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: number): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.productID == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  add(id: number): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.productID == id) {
        //cart.splice(i, 1);
        this.items.push({
          product: item.product,
          quantity: item.quantity++
        });
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }


//  _this.increaseItemAmount = function (item) {
//    item.quantity++;
//    item.showAddToCart = true;
//  }

//  _this.decreaseItemAmount = function (item) {
//    item.quantity--;
//    if (item.quantity <= 0) {
//      item.quantity = 0;
//      item.addedToCart = false;
//      item.showAddToCart = false;
//      var itemIndex = _this.cartStorage.items.indexOf(item);
//      if (itemIndex > -1) {
//        _this.cartStorage.items.splice(itemIndex, 1);
//      }
//    } else {
//      item.showAddToCart = true;
//    }
//  }
//})


}

