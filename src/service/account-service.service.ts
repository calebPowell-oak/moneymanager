import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  accountUrl: string;
  constructor(private http:HttpClient) { 
    this.accountUrl = "http://moneyapp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/api/accounts";
    // this.accountUrl = 'MoneyApp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/accounts';
  }

  public getAccount(): Observable<Account>{
    return this.http.get<Account>(this.accountUrl + "/1")
  }

  public getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>("/proxy/api/accounts");
  }

  public getAccountsByUser(userid: string): Observable<Account[]>{
    return this.http.get<Account[]>("/proxy/api/accounts/user/" + userid);
  }

  public createAccount(balance: number, userid: number): Observable<Account>{
    let newAccount: Account = {id: 1, balance: balance, userId: userid}
    console.log("creating new account with userid:" + newAccount.userId);
    return this.http.post<Account>("/proxy/api/accounts", newAccount);
  }

  public deleteAccount(id: number): Observable<boolean>{
    return this.http.delete<boolean>("/proxy/api/accounts/" + id);
  }


}
