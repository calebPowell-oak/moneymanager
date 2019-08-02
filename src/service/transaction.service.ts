import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { 
    // this.transactionUrl="http://moneyapp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/transactions";
  }

  public transfer(fromAccountId: number, toAccountId: number, amount: number, userId: number): Observable<any>{
    let transaction: Transaction = {transactionId: -1, fromAccountId:fromAccountId, toAccountId:toAccountId,
       amount:amount, memo: "this space left blank", userId: userId};
      console.log("making transfer");
    return this.http.post(this.baseUrl + "/api/transaction/transfer", transaction);
  }

  public deposit(toAccountId: number, amount: number, userId: number): Observable<any>{
    let transaction: Transaction = {transactionId: -1, fromAccountId:9999, toAccountId:toAccountId,
      amount:amount, memo: "this space left blank", userId: userId};
    console.log("making deposit for " + amount);
    return this.http.post(this.baseUrl + "/api/transaction/deposit", transaction);
  }

  public withdraw(fromAccountId: number, amount: number, userId: number): Observable<boolean>{
    let withdrawl: Transaction = {transactionId: -1, fromAccountId: fromAccountId, toAccountId:-1,
      amount:amount, memo:"to be implemented later",userId: userId}
    return this.http.post<boolean>(this.baseUrl + "/api/transaction/withdraw/", withdrawl);
  }

  public getTransactions(userId: string): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.baseUrl + "/api/transaction/user/" + userId)
  }

  
}
