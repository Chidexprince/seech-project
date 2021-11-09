import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';

import { Payment } from './../../models/payment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  public transactions: Payment[] = [];
  public searchTerm: string;

  constructor(public paymentService: PaymentsService) { }

  ngOnInit(): void {
    this.getTransactionStatus();
    this.getTransactions();

  }

  getTransactions() {
    this.transactions = [];
    this.paymentService.getTransactions()
      .forEach(t => {
        const transaction = new Payment();
        transaction.amount = t.amount;
        transaction.recipient = t.recipient;
        transaction.description = t.description;
        transaction.date = t.date;
        this.transactions.push(transaction)
      });
    console.log(this.transactions)
  }

  getTransactionStatus() {
    this.paymentService.getTransactionStatus()
      .subscribe(data => {
        if (data) {
          this.getTransactions();
        }
      })
  }

  searchTransaction() {
    this.transactions = this.transactions.filter(t =>
      this.searchTerm == t.recipient);
    console.log(this.transactions)

  }



}
