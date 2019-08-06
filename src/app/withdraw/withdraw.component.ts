import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Account } from '../../model/account';
import { UserService } from 'src/service/user.service';
import { AccountServiceService } from 'src/service/account-service.service';
import { TransactionService } from 'src/service/transaction.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  currentUser: User;
  selectedAccount: Account;
  userAccounts: Account[];
  withdrawAmount: number;
  memo: string;
  localDateTime: Date; 

  constructor(private userService: UserService,
    private accountService: AccountServiceService,
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.getUserAccounts();
  }

  getUserAccounts(){
    this.accountService.getAccountsByUser(this.currentUser.id).subscribe(accounts => this.userAccounts = accounts);
  }

  withdraw(){
    this.transactionService.withdraw(this.selectedAccount.id, this.withdrawAmount, +this.currentUser.id, this.memo, this.localDateTime).subscribe(() => {
      this.getUserAccounts();
      delete this.withdrawAmount;
      delete this.memo;
    });
  }

}
