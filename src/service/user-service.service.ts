import { Injectable } from '@angular/core';
import { User } from 'src/model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userUrl = 'http://moneyapp-env.njfvb73f7f.us-east-2.elasticbeanstalk.com/';

  constructor(private http: HttpClient) { }

public createUser(user: User): Observable<User> {
  return this.http.post<User>(this.userUrl + '/users', user);


}





}
