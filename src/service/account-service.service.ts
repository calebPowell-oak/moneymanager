import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { 
    //this.accountUrl = "http://moneyapp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/api/accounts";
    // this.accountUrl = 'MoneyApp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/accounts';
  }

  // public getAccount(): Observable<Account>{
  //   return this.http.get<Account>(this.accountUrl + "/1")
  // }

  public getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(this.baseUrl + "/api/accounts");
  }

  public getAccountsByUser(userid: string): Observable<Account[]>{
    return this.http.get<Account[]>(this.baseUrl + "/api/accounts/user/" + userid);
  }

  public createAccount(balance: number, userid: number, purpose: string): Observable<Account>{
    let newAccount: Account = {id: 0, balance: balance, userId: userid, purpose:purpose}
    console.log("creating new account with userid:" + newAccount.userId);
    return this.http.post<Account>(this.baseUrl + "/api/accounts", newAccount);
  }

  public deleteAccount(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.baseUrl + "/api/accounts/" + id);
  }


}
