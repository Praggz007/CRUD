import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  loginError = '';
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, public auth: AuthService) { }

  login(): void {
    this.loginError = '';
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.getRawValue();
    this.auth.login(username || '', password || '').subscribe({
      error: error => this.loginError = error.error?.error || 'Could not sign in. Please try again.'
    });
  }

  logout(): void {
    this.auth.logout();
    this.loginForm.reset();
  }
}
