import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(User: { email: any; password: any; }) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    }
    else {
      localStorage.clear()
    }
  }

  get token() {
    const expDateString = localStorage.getItem('fb-token-exp')
    if (expDateString) {
      const expDate = new Date(expDateString)
      if (new Date() > expDate) {
        this.logout()
        return null
      }
      else {
        return localStorage.getItem('fb-token')
      }
    }
    else {
      this.logout()
      return null
    }
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(){
    return !!this.token
  }
}