import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

class Contact{
  constructor(){}
  public firstName: string;
  public lastName : string;
}

class person {
  constructor(){}
  public email : string;
  public password : string;
  public contact = new Contact();
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean = false; 
  //person = new person();

  form = new FormGroup({
    email : new FormControl(),
    password : new FormControl(),
    contact : new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl()
    })
  });

  constructor(
    private router: Router, 
    private route : ActivatedRoute,
    private authService: AuthService) { }

  signIn() {
    let credentials = this.form.value;
    //let credentials = this.person;
    console.log(JSON.stringify(credentials));
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result){
          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          this.router.navigate([returnUrl || '/']);
        }
        else  
          this.invalidLogin = true; 
      });
  }
}
