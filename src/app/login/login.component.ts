import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Input('loginStatus') loggedIn: boolean;

  constructor(private userService: UserService) { }

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
      if(x.firstName != user.firstName){
        this.userService.setUser(x);
        this.userService.loggedIn = true;
      }
    });
  }
}
