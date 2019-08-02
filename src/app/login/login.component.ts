import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../../service/user.service';
import { MessageService } from 'src/service/message.service';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Input('loginStatus') loggedIn: boolean;

  constructor(private userService: UserService,
    public messageService: MessageService) { }

  ngOnInit() {
  }
  login():void{
    let user: User;
    let usernamestring: string = (document.getElementById('emailLogin') as HTMLInputElement).value;
    let passwordstring: string = (document.getElementById('passwordLogin') as HTMLInputElement).value;

    user = {id: '',
    firstName: '',
    lastName: '',
    userName: usernamestring,
    passwordHash: passwordstring,
    email: ''};

    this.userService.login(user).subscribe(x => {
      if(x.id){
        this.userService.setUser(x);
        this.userService.loggedIn = true;
      }
    });
  }
}
