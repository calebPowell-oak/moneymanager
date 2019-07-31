import { Component, OnInit } from '@angular/core';
import { User } from '../model/user'
import { UserService } from '../service/user.service';
import { MessageService} from '../service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Money Managing App';
  loggedIn: boolean;
  currentUser: User;
  currentPage: string = 'login'; 
  currentPageLoggedIn: string = 'splash';
  currentPageNotLoggedIn: string = 'login-splash';

  caleb: User = {
    id: '3',
    firstName: 'Caleb',
    lastName: 'Powell',
    userName: 'z',
    passwordHash: 'z',
    email: 'z'
  }

  constructor(public userService: UserService,
    public messageService: MessageService){
  }

  ngOnInit() {
   this.loggedIn = this.userService.loggedIn; 
    // this.toggleLogin();
    // this.userService.setUser(this.caleb);
  }

  toggleLogin(){
    if(this.loggedIn){
      this.loggedIn = false;
      this.currentUser = null;
      this.userService.clearUser();
      //console.log("if"); 
    } else {
      this.loggedIn = true;
      this.currentUser = this.caleb;
      this.userService.setUser(this.caleb); 
      //console.log("else");
    }
    //console.log("userService.loggedIn = " + this.userService.loggedIn);
  }

  setCurrentPageLoggedIn(newPage: string){
    this.messageService.clearMessage();
    this.currentPageLoggedIn = newPage;
    // this.currentPage = newPage; 
  }

  setCurrentPageNotLoggedIn(newPage: string){
    this.messageService.clearMessage();
    this.currentPageNotLoggedIn = newPage; 
  }

  logout(){
    this.messageService.clearMessage();
    this.currentPageLoggedIn = 'splash';
    this.currentPageNotLoggedIn = 'login-splash';
    this.userService.clearUser();
  }

}
