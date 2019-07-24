import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { AccountServiceService } from 'src/service/account-service.service';
import { User } from '../../model/user';
import { Account } from '../../model/account';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  currentUser: User;
  userAccounts: Account[];
  selectedAccount: Account;
  accountDeleted: boolean = false;

  constructor(private userService: UserService,
    private accountService: AccountServiceService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.accountService.getAccountsByUser(this.currentUser.id)
    .subscribe(accounts => this.userAccounts = accounts);
  }

  deleteAccount(){
    this.accountService.deleteAccount(this.selectedAccount.id).
    subscribe(result => {this.accountDeleted = result; 
      this.accountService.getAccountsByUser(this.currentUser.id)
      .subscribe(accounts => this.userAccounts = accounts)});
    delete this.selectedAccount;
  }

}
