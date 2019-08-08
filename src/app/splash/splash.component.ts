import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/service/account-service.service';
import { Account } from '../../model/account';
import { User } from 'src/model/user';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountServiceService,
    public userService: UserService){}     

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(){
    this.accountService.getAccountsByUser(this.userService.getUser().id).subscribe(
      userAccounts => this.accounts = userAccounts
      );
  }

}
