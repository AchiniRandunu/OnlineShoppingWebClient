import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/user/login/login.component';
import { RegistrationComponent } from '../app/components/user/registration/registration.component';
import { HomeComponent } from '../app/components/home/home.component';
import { UserComponent } from '../app/components/user/user.component';
import { UserService } from '../app/shared/services/user.service';
import { AuthInterceptor } from '../app/components/auth/auth.interceptor';
import { NavMenuComponent } from '../app/components/nav-menu/nav-menu.component';
import { ProductComponent } from '../app/components/product/product.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    UserComponent,
    NavMenuComponent,  
    ProductComponent, ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    ViewOrderComponent,
    OrderConfirmationComponent,
    PaymentHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


