import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { OnlineShoppingManagementService } from '../../services/online-shopping-management.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Item } from '../product/model/item';
import { ToastrService } from 'ngx-toastr';
import { OrderLineItem } from '../product/model/orderLineItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private checkoutSub: Subscription; 
  //private userName = new BehaviorSubject<string>(sessionStorage.getItem('UserNameForID'));
  private items: Item[] = [];
 
  private total: number = 0;

  constructor(private onlineShoppingManagementService: OnlineShoppingManagementService,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  formModel = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    shipMethod: ['', Validators.required],
    cardname: ['', Validators.required],
    cardnumber: ['', Validators.required],
    expmonth: ['', Validators.required],
    expyear: ['', Validators.required],
    cvv: ['', Validators.required]

  });


  ngOnDestroy(): void {
    if (this.checkoutSub)
      this.checkoutSub.unsubscribe();
  }

  ngOnInit() {
    this.getCart();
  }


  checkout() {
    let orderLineItems: OrderLineItem[] = [];
    this.items.forEach(function (value) {

      orderLineItems.push({
        productID: value.product.id,
        quantity: value.quantity,
        price: value.product.price
      });
 
    });

    var body = {

      FullName: this.formModel.value.fullname,
      PaymentMethod: "Card only",
      PaymentStatus: "Paid",
      ShipAddress: this.formModel.value.address + this.formModel.value.city + this.formModel.value.state,
      ShippingMethod: this.formModel.value.shipMethod,
      Email: this.formModel.value.email,
      PhoneNumber: this.formModel.value.phone,
      OrderTotalPrice: this.total,
      OrderStatus: "Completed",
      ZipCode: this.formModel.value.zip,
      OrderLineItems: orderLineItems,
      UserName: sessionStorage.getItem('UserNameForID')
     
    };

    this.checkoutSub = this.onlineShoppingManagementService.saveOrder(body).subscribe(data => {
      
      if (data.data != "Failed") {
        this.toastr.success('Alert', 'Order is Placed Successfully.');
        this.formModel.reset();
      }
      else {
        this.toastr.success('Alert', 'Order Placed is Failed');
        this.formModel.reset();
      }      
     
    });

    sessionStorage.setItem('Email', body.Email);
  
  }

  getCart(): void {
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
}
