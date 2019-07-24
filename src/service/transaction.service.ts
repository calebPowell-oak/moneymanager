import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionUrl: string;

  constructor(private http: HttpClient) { 
    // this.transactionUrl="http://moneyapp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/transactions";
  }

  public transfer(fromAccountId: number, toAccountId: number, amount: number, userId: number): Observable<any>{
    let transaction: Transaction = {fromAccountId:fromAccountId, toAccountId:toAccountId,
       amount:amount, memo: "this space left blank", userId: userId};
      console.log("making transfer");
    return this.http.post("/proxy/api/transaction/transfer", transaction);
  }

  public deposit(toAccountId: number, amount: number, userId: number): Observable<any>{
    let transaction: Transaction = {fromAccountId:9999, toAccountId:toAccountId,
      amount:amount, memo: "this space left blank", userId: userId};
    console.log("making deposit");
    return this.http.post("/proxy/api/transaction/deposit", transaction);
  }

  public withdraw(toAccountId: string, amount: number): Observable<boolean>{
    return this.http.post<boolean>("/proxy/api/transaction/withdraw/" + toAccountId, amount);
  }
}
