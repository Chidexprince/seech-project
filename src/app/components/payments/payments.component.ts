import { Component, OnInit } from '@angular/core';
import { Payment } from './../../models/payment';
import { PaymentsService } from './../../services/payments.service';


declare function showToast(msg): any;

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

  }

  makePayment() {
    this.transactions = JSON.parse(localStorage.getItem('Transactions')); // pull transactions from storage and parse
    this.transactions.unshift(this.paymentDetails); // add new transaction in front
    this.paymentDetails = new Payment();  //instantiate the object
    localStorage.setItem('Transactions', JSON.stringify(this.transactions)); // store new transaction to storage
    this.paymentService.updateTransactionStatus(this.transactions); // update status so list can be updated
    showToast('Payment was successful'); // notify user
  }

  populateDefaultTransactions() {
    this.paymentService.populateDefaultTransactions();
  }

}
