import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account';
import { AccountServiceService } from '../../service/account-service.service';
import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user';
import { TransactionService } from 'src/service/transaction.service';
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  //account: Account;
  accounts: Account[];
  userAccounts: Account[] = [];
  currentAccountFrom: Account;
  currentAccountTo: Account;
  user: User;
  transferAmount: number;
  memo: string;
  localDateTime: Date;

  constructor(private accountServiceService: AccountServiceService,
    private userService: UserService,
    private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getAccounts();
    this.getUser();
  }

  // updateAccount(){
  //   this.accountServiceService.getAccount().subscribe(account => this.account = account);
  // }

  getAccounts(){
    this.accountServiceService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  getUserAccounts(){
    this.accountServiceService.getAccountsByUser(this.user.id).subscribe(
      userAccounts => this.userAccounts = userAccounts);
    
  }

  setCurrentAccountFrom(acc: Account): void{
    this.currentAccountFrom = acc;
    if(this.currentAccountFrom === this.currentAccountTo){
      delete this.currentAccountTo;
    }
  }

  setCurrentAccountTo(acc: Account): void{
    this.currentAccountTo = acc;
  }

  clearAccount(): void{
    delete this.currentAccountFrom;
    delete this.currentAccountTo;
    delete this.transferAmount;
  }

  getUser(){
    this.user = this.userService.getUser();
    this.getUserAccounts();
  }

  makeTransaction(){
    this.transactionService.transfer(this.currentAccountFrom.id, 
      this.currentAccountTo.id, this.transferAmount, this.currentAccountFrom.userId, this.memo, this.localDateTime).subscribe(()=> {
        this.getAccounts(); 
        this.getUserAccounts(); 
        delete this.transferAmount;
        delete this.memo;
      });
  }

  filterAccountFromAccountList(account: Account, accountList: Account[]): Account[]{
    return accountList.filter(x => x !== account);
    //return this.userAccounts
  }
}
