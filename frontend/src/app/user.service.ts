import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'

    })
  }

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:false,
      headers:new HttpHeaders().append('Content-Type','application/json')
  
    });
  }

  user(){ 

    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
     // headers:new HttpHeaders().append('Content-Type','application/json')
     headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3000/users/user',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS'

    })

    })
  }
  
  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }


  getEmps() {
    return this._http.get('/api/emps')
  }

}