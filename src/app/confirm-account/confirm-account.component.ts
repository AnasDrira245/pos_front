import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseOut } from 'src/models/interfaces/baseOut';
import { ConfirmAccount } from 'src/models/interfaces/confirmAccount';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    this.activateRoute.queryParams.subscribe((params) => {
      const entry: ConfirmAccount = {
        confirmation_code: params['confirmation_code'], 
      };

      this.authService.confirmAccount(entry).subscribe((data: BaseOut) => {
        const success = data.status_code === 200;
        const severity = success ? 'success' : 'error';
        this.messageService.add({ severity, summary: severity, detail: data.detail });
        if (success) {
          this.router.navigate(['/login']);
        }
      });
    });

    
  }
}
