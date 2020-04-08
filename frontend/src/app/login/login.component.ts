import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup = new FormGroup(
    {
      email: new FormControl(null,[Validators.email,Validators.required]),
      password: new FormControl(null,Validators.required)
    });

  constructor( private router:Router, private _user:UserService) { }

  ngOnInit() {
  }

  movetoregister() {
    this.router.navigate(['/register']);
  }

  login() {

  
    if(!this.loginform.valid){
      console.log("Invalid!"); return;
    }

    //console.log(JSON.stringify(this.loginform.value));

   this._user.login(JSON.stringify(this.loginform.value)).subscribe(
     data=>{console.log(data); this.router.navigate(['/user']);},
     error=>console.error(error)

     
     
   )
   

   
  }

}
