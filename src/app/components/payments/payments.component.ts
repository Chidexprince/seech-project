import { Component, OnInit } from '@angular/core';
import { Payment } from './../../models/payment';
import { PaymentsService } from './../../services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  public paymentDetails = new Payment();
  public transactions = [];

  constructor(public paymentService: PaymentsService) { }

  ngOnInit(): void {
    this.populateDefaultTransactions();

    console.log('You are in payments')
  }

  makePayment() {
    console.log(this.paymentDetails);
    this.transactions = JSON.parse(localStorage.getItem('Transactions'));
    this.transactions.push(this.paymentDetails);
    this.paymentDetails = new Payment();
    localStorage.setItem('Transactions', JSON.stringify(this.transactions));
    this.paymentService.updateTransactionStatus(this.transactions);
    console.log(this.transactions);
  }

  populateDefaultTransactions() {
    this.paymentService.populateDefaultTransactions();
  }

}
