import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserServiceService } from '../service/user-service.service';
import { AccountServiceService } from '../service/account-service.service';
import { HttpClientModule } from '@angular/common/http';
import { SplashComponent } from './splash/splash.component';
import { LoginSplashComponent } from './login-splash/login-splash.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    WithdrawComponent,
    DepositComponent,
    AddAccountComponent,
    DeleteAccountComponent,
    TransactionsComponent,
    SplashComponent,
    LoginSplashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AccountServiceService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
