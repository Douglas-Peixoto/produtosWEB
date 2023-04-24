import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  isAuthenticated(): boolean {

    return localStorage.getItem('login_usuario') != null
        && localStorage.getItem('access_token') != null;
  }
}
