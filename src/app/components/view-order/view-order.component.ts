import { Component, OnInit, ElementRef, Input, TemplateRef } from '@angular/core';
import { Item } from '../product/model/item';
import { Product } from '../product/model/product';
import { Subscription } from 'rxjs';
import { OnlineShoppingManagementService } from '../../services/online-shopping-management.service';
import { ToastrService } from 'ngx-toastr';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html', 
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  //@Input() billTemplate: TemplateRef<any>;
  @Input() billTemplate: string | TemplateRef<any>;
 
  private items: Item[] = [];
  private total: number = 0;  
  private orderLineItems: Product[] = [];
  private sendEmailSub: Subscription;
  //elRef: ElementRef


  constructor(private onlineShoppingManagementService: OnlineShoppingManagementService,
    private toastr: ToastrService, private elRef: ElementRef) { }

  ngOnDestroy(): void {
    if (this.sendEmailSub)
      this.sendEmailSub.unsubscribe();
  }

  ngOnInit() {
    this.getCartItems();   
  }

  getCartItems() {
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

    this.getCartProductDetails();
  }

  getCartProductDetails() { 
    
    let orderItems: Product[] = [];
    this.items.forEach(function (value) {
      
      orderItems.push({
        id: value.product.id,
        description: value.product.description,
        productSKU: value.product.productSKU,
        categoryID: value.product.categoryID,
        imageName: value.product.imageName,
        productName : value.product.productName,
        quantity: value.quantity,
        price: value.product.price
      });

    });
    this.orderLineItems = orderItems;

  }  


  sendEmail() {
    var body = {

      ToEmail: sessionStorage.getItem('Email'),
      Subject: "Bill Summary",
      BodyProducts: this.orderLineItems,
      Attachments: '',
      UserName: sessionStorage.getItem('UserNameForID')

    };      

    this.sendEmailSub = this.onlineShoppingManagementService.sendEmail(body).subscribe(data => {

      if (data.data != "Failed") {
        this.toastr.success('Alert', 'Sending Bill Successfully.');
        
      }
      else {
        this.toastr.success('Alert', 'Sending Bill is Failed');
        
      }

    });
  }

}



