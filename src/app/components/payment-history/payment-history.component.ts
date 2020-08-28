import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnlineShoppingManagementService } from '../../services/online-shopping-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-sending',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {

  private paymentSub: Subscription;
  paymentDetails = []; 
  
  constructor(private onlineShoppingManagementService: OnlineShoppingManagementService, private toastr: ToastrService) { }

  ngOnDestroy(): void {
    if (this.paymentSub)
      this.paymentSub.unsubscribe();
  }


  ngOnInit() {
    this.getPaymentDetails();
  }

  getPaymentDetails() {

    this.paymentSub = this.onlineShoppingManagementService.getPaymentByUser
      (sessionStorage.getItem('UserNameForID')).subscribe(data => {
        if (data.data != null) {
          this.paymentDetails = data.data;
          this.toastr.success('Alert', 'Payment details got Successfully.');
        }
        else
          this.toastr.success('Alert', 'Payment details not get Successfully.');
    });

  }

}
