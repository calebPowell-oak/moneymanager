import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { User } from '../../model/user';
import { AccountServiceService } from 'src/service/account-service.service';
import { Account } from '../../model/account';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  currentUser: User;
  newBalance: number;
  accountCreated: boolean = false;
  createdAccount: Account;

  constructor(private userService: UserService,
    private accountService: AccountServiceService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
  }

  makeNewAccount(){
    console.log("button pressed");
    this.accountService.createAccount(this.newBalance, +this.currentUser.id)
    .subscribe(account => this.createdAccount = account);
  }

}
