import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/service/transaction.service';
import { Transaction } from '../../model/transaction';
import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.css']
})
export class TransactionDashboardComponent implements OnInit {

  user: User;
  userTransactions: Transaction[]; 

  constructor(private transactionService: TransactionService,
    private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.getAllTransactions();
  }

  getAllTransactions(){
    this.transactionService.getTransactions(this.user.id).subscribe(transactions => this.userTransactions = transactions);
  }

}
