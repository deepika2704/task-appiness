import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from './password.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    username : new FormControl('',[Validators.required]),
    name : new FormControl('', 
    [
      Validators.required,
    ]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8), 
      Validators.pattern('^[a-zA-Z0-9].{8,15}$')]),
    confirm_password : new FormControl('', [Validators.required]),
    mobile_number : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address : new FormControl('', [Validators.required, Validators.maxLength(30)]),
  },
  {
    validators: PasswordValidation.MatchPassword 
  })
  constructor(private router:Router) { }

  get username(){
   return this.form.get('username'); 
  }
  get name(){
    return this.form.get('name'); 
   }
   get email(){
    return this.form.get('email'); 
   }

   get password(){
    return this.form.get('password'); 
   }
   get confirm_password(){
    return this.form.get('confirm_password'); 
   }
   get mobile_number(){
    return this.form.get('mobile_number'); 
   }
   get address(){
    return this.form.get('address'); 
   }

   onSignUp()
   {
     let user = this.form.value;
     let usersList:any = localStorage.getItem('Users');
     if(usersList)
     {
        usersList = JSON.parse(usersList);
        var exists; 
        let User = usersList.find(function(localUser)
        {
            if(localUser.username == user.username )  {
              exists = "UserName already Exists";
              return;
            }
            else if( localUser.email == user.email ){
              exists = "Email already Exists";
              return;
            }
            else if( localUser.mobile_number == user.mobile_number ){
              exists = "Mobile Number already Exists";
              return;
            }
            else
            {
              return true;
            }              
        });

        if(User == undefined)
        {
          alert(exists);
          return false;
        }

        usersList.push(user);
        usersList = JSON.stringify(usersList);
     }
     else
     {
        usersList = JSON.stringify([user]);
     }

     localStorage.setItem('Users',usersList);
     this.router.navigateByUrl('');

   }//onSignUp
 
  ngOnInit() {
  }

}