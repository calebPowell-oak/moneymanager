import { Injectable } from '@angular/core';
import { User} from '../model/user';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  loggedIn: boolean; 
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
	private messageService: MessageService,
	private cookies: CookieService) {
    this.loggedIn = false;
    // this.currentUser = {
    //   id: '17',
    //   firstName: 'John',
    //   lastName: 'Smiff',
    //   userName: 'JSmiff17',
    //   passwordHash: 'SmiffRulez',
    //   email: 'Smiff@sniffz.org'
    // }
  }

  getUser(): User{
    return this.currentUser;
  }

  checkCookies(){
	if(this.cookies.check('userinfo')){
		let content: string = this.cookies.get('userinfo');
		let user: User = {id: '',
			firstName: '',
			lastName: '',
			userName: content.split('\n')[0],
			passwordHash: content.split('\n')[1],
			email: ''
		};
		
		this.login(user);
	}
  }

  setCookies(user: User){
	  this.cookies.set('userinfo', user.userName + '\n' + user.passwordHash);
  }

  login(tryUser: User): Observable<User>{
    console.log(this.baseUrl);
    // let badUser: User;
    // badUser.id = '-1';
    return this.http.post<User>(this.baseUrl + '/api/users/login', tryUser).pipe(
      catchError(err => {
        this.messageService.setMessage(this.getLoginMessage(err.status));
       return of(new User())
      })
    );
  }

  createUser(newUser: User): Observable<User>{
    return this.http.post<User>(this.baseUrl + '/api/users', newUser).pipe(
      catchError(err =>{
        this.messageService.setMessage(this.getCreateUserMessage(err.status));
        console.log("user service message: " + this.messageService.message)
        return of(new User())
      })
    );
  }

  setUser(user: User){
    this.currentUser = user;
    this.loggedIn = true; 
  }

  clearUser(){
    delete this.currentUser;
    this.loggedIn = false;
  }

  getLoginMessage(status: number): string{
    if(status == 422){
      return "invalid username or password";
    }
    else{
      return "problem connecting to server";
    }
  }

  getCreateUserMessage(status: number): string{
    if(status == 400){
      return "Username is already taken";
    }
    else{
      return "problem connecting to server" + status;
    }
  }

  // private handleLoginError<User> ( ){
  //   let badUser = new User();
  //   badUser = {
  //   id: '',
  //   firstName: '',
  //   lastName: '',
  //   userName: '',
  //   passwordHash: '',
  //   email: ''};
  //   }
  //   return(error: any): Observable<User> => {
  //     console.error(error);
  //     return of(badUser);
  //   }
  // }
}
