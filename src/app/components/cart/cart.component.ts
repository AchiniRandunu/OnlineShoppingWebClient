import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product/model/product';
import { Item } from '../product/model/item';
import { OnlineShoppingManagementService } from '../../../app/services/online-shopping-management.service';
import {  Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private items: Item[] = [];
  private total: number = 0;
  product = new Product();
  result: any;

  data: any[] = [];
  private productSub: Subscription; 


  constructor(private onlineShoppingManagementService: OnlineShoppingManagementService, private router: Router) {   
  }
  ngOnDestroy(): void {
    if (this.productSub)     
    this.productSub.unsubscribe();
    }

  ngOnInit() {
   
    if (sessionStorage.getItem('cart') != null) {
      this.loadCart();
    }
        this.getProductDetailsByID();


  }

 getItem(id: Number) {

   this.productSub = this.onlineShoppingManagementService.getProductByID(id).subscribe(data => {
      console.log(data.data);
      this.product = data.data;     
     this.setProducts(id);
   });   
    return this.product;    
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          product: item.product,
          quantity: item.quantity
        });
        this.total += item.product.price * item.quantity;
      }
    }
 
  }

  remove(id: number): void {
    let cart: any = JSON.parse(sessionStorage.getItem('cart'));  
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  add(id: Number): void {  

    let cart: any = JSON.parse(sessionStorage.getItem('cart'));
    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.id == id) {
          if (item.product.quantity > item.quantity) {

            item.quantity += 1;
            cart[i] = JSON.stringify(item);
            sessionStorage.setItem("cart", JSON.stringify(cart));
          }        

        }
      }

      this.loadCart();
    }
  }

  minus(id: Number): void {

    let cart: any = JSON.parse(sessionStorage.getItem('cart'));
    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.id == id) {
          if (item.quantity > 1 ) {

            item.quantity -= 1;
            cart[i] = JSON.stringify(item);
            sessionStorage.setItem("cart", JSON.stringify(cart));
          }
        }
      }
      this.loadCart();
    }
  }


  getProductDetailsByID() {
    let id = sessionStorage.getItem('id');
    if (id!= "0" && id !=null) {      
      var d = this.getItem(Number(id));     
    }

  }


  setProducts(id :Number) {
    if (this.product) {
      var item: Item = {

        product: this.product,
        quantity: 1
      };

      if (sessionStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(item));
        sessionStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(sessionStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = JSON.parse(cart[i]);
          if (item.product.id == id) {
            index = i;
            break;
          }
        
      }
        if (index == -1) {
          cart.push(JSON.stringify(item));
          sessionStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let item: Item = JSON.parse(cart[index]);
          item.quantity += 1;
          cart[index] = JSON.stringify(item);
          sessionStorage.setItem("cart", JSON.stringify(cart));
        }

        sessionStorage.setItem('id',"0");
      }
      this.loadCart();
    }

  }

  cancel() {
    sessionStorage.removeItem('cart');
    this.router.navigate(['/product']); 
  }

}

