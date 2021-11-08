import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    PaymentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
