import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map'; 

@Injectable()
export class AuthService {
  currentUser: any; 

  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .map(response => {
      let result = response.json();
      
      if (result && result.token) {
        localStorage.setItem('token',result.token);

        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

        return true; 
      }
      else return false; 
    });
  }

  logout() { 
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() { 
    /* ========= WHAT HAPPEDN UNDER THE HOOT   ========
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem("token");

    if(!token)
      return false;

    let exiprationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
     ========= WHAT HAPPEDN UNDER THE HOOT   ======== */
     return tokenNotExpired();

  }

  get currentUserForAdmin(){
    let token = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token);
  }
}

