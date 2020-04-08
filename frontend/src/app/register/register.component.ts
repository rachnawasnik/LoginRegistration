import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform:FormGroup = new FormGroup({   
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpassword: new FormControl(null, Validators.required)
  });

  constructor(private router:Router, private _userservice : UserService) { }

  ngOnInit() {
  }

  moveToLogin() {

    this.router.navigate(['/login']);
  }

  register(){
    if(!this.registerform.valid || (this.registerform.controls.password.value != this.registerform.controls.cpassword.value)){

      console.log("Invalid Form"); return;
    }

    this._userservice.register(JSON.stringify(this.registerform.value)).subscribe(
      data => {console.log(data);
        this.router.navigate(['/login']);},
        error=>console.error(error)
    )

    console.log(JSON.stringify(this.registerform.value));
  }

}
