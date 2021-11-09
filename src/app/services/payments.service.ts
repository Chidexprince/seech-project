import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Payment } from "./../models/payment";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  private transaction: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(public httpClient: HttpClient) {}

  public getDefaultTransactions() {
    const transactionsUrl = '/assets/data/transactions.json';
    return this.httpClient.get<Payment[]>(transactionsUrl);
  }

  public populateDefaultTransactions() {
    this.getDefaultTransactions().subscribe((data) => {
      localStorage.setItem('Transactions', JSON.stringify(data));
    });
  }

  public getTransactions(): Payment[] {
    const transactions: Payment[] = JSON.parse(
      localStorage.getItem('Transactions')
    );
    return transactions;
  }

  // Getting the value as an Observable for transaction
  public getTransactionStatus(): Observable<any> {
    return this.transaction.asObservable();
  }

  // passing transactions
  public updateTransactionStatus(transactions) {
    this.transaction.next(transactions);
  }
}
