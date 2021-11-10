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

    setTimeout(() => {
      this.getTransactions();
    }, 500);

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
    // on blur, fetch all transactions
    if (this.searchTerm == '') {
      this.getTransactions();
    } else {
      // search for term
      this.transactions = this.transactions.filter(t =>
        this.searchTerm.toLowerCase() == t.recipient.toLowerCase());
    }
  }


}
