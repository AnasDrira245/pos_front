import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Login } from 'src/models/interfaces/login';
import { LoginToken } from 'src/models/interfaces/loginToken';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  deepCopy(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
  }

  onSubmit() {
    const form: Login = this.deepCopy(this.loginForm.value);
   
    this.authService.login(form).subscribe((data: LoginToken) => {
      const success = data.status_code === 200;
      const severity = success ? 'success' : 'error';
      this.messageService.add({ severity, summary: severity, detail: data.detail });
      if (success) {
        localStorage.setItem("token", data.access_token);
        this.router.navigate(['/employees']);
      }
    });
  }
}
