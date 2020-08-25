import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  loginUser(username:string,password:string){
    return this.http.post("http://localhost:8081/admin/login",{"username":username,"password":password});
  }

}
