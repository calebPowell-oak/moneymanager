import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string;

  constructor() { }

  setMessage(newMessage: string){
    this.message = newMessage;
  }

  clearMessage(){
    delete this.message;
  }
}
