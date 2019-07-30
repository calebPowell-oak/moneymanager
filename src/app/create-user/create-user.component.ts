import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../../service/user.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Input('loginStatus') loggedIn: boolean;

user: User;

  constructor(private userService: UserService,
    public messageService: MessageService) { }

  ngOnInit() {
  }
  createUser(): void {
    const emailstring: string = (document.getElementById('emailCreateUser') as HTMLInputElement).value;
    const passwordstring: string = (document.getElementById('passwordCreateUser') as HTMLInputElement).value;
    const firstName: string = (document.getElementById('firstNameCreateUser') as HTMLInputElement).value;
    const lastName: string = (document.getElementById('lastNameCreateUser') as HTMLInputElement).value;
    const userName: string = (document.getElementById('userNameCreateUser') as HTMLInputElement).value;

    this.user = {
      id: '',
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      passwordHash: passwordstring,
      email: emailstring
    };

    this.userService.createUser(this.user).subscribe(newUser => this.userService.setUser(newUser));
  }
}
