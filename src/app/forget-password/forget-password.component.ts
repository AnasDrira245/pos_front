import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginToken } from 'src/models/interfaces/loginToken';
import { AuthService } from '../services/auth/auth.service';
import { ForgetPassword } from 'src/models/interfaces/forgetPassword';
import { BaseOut } from 'src/models/interfaces/baseOut';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetPasswordForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  deepCopy(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
  }

  onSubmit() {
    const form: ForgetPassword = this.deepCopy(this.forgetPasswordForm.value);
   
    this.authService.forgetPassword(form).subscribe((data: BaseOut) => {
      const success = data.status_code === 200;
      const severity = success ? 'success' : 'error';
      this.messageService.add({ severity, summary: severity, detail: data.detail });
    });
  }
}