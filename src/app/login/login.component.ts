import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('', [Validators.required]),
  })

  constructor(private router:Router) { }

  get username(){
    return this.form.get('username'); 
   }
   get password(){
     return this.form.get('password'); 
    }
 
    openSignUp(){
      this.router.navigateByUrl('signup');
    }

    login(fromValues){

      let UsersList:any = localStorage.getItem("Users");

      if(UsersList){
        UsersList = JSON.parse(UsersList);
        let User = UsersList.find(function(user)
        {
            if( (user.username == fromValues.username || user.mobile_number == fromValues.username || user.email == fromValues.username) && user.password == fromValues.password)
              return true;
            else{
              return false;
            }
              
        });

        if(User == undefined)
        {
          alert("Invalid Login Credentials");
          return false;
        }

        localStorage.setItem('activeUser', JSON.stringify(User));
        this.router.navigateByUrl('home');
        //this.router.navigate(['/home',User.id]);

      }else{
        alert("Invalid User Detials");
      }
    }

  ngOnInit() {
  }

}
