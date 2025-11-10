import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/models/baseURL';
import { BaseOut } from 'src/models/interfaces/baseOut';
import { ConfirmAccount } from 'src/models/interfaces/confirmAccount';
import { ForgetPassword } from 'src/models/interfaces/forgetPassword';
import { Login } from 'src/models/interfaces/login';
import { LoginToken } from 'src/models/interfaces/loginToken';
import { ResetPassword } from 'src/models/interfaces/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(form: Login) {
    let params = new HttpParams()
      .set("username", form.username)
      .set("password", form.password);
    
    const endPointUrl = baseUrl + 'token';
    return this.http.post<LoginToken>(endPointUrl, params);
  }

  forgetPassword(form: ForgetPassword) {
    const endPointUrl = baseUrl + 'forgotPassword';
    return this.http.post<LoginToken>(endPointUrl, form);
  }

  resetPassword(form: ResetPassword) {
    const endPointUrl = baseUrl + 'resetPassword';
    return this.http.patch<BaseOut>(endPointUrl, form);
  }

  confirmAccount(form: ConfirmAccount) {
    const endPointUrl = baseUrl + 'confirmAccount';
    return this.http.patch<BaseOut>(endPointUrl, form);
  }
}
