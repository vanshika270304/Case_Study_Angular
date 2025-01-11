import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  // Handle Login Submission
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please provide valid email and password.';
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      (response) => {
        // Clear previous error messages
        this.errorMessage = null;
        this.successMessage = 'Login successful!';

        // Save full JSON response in localStorage
        localStorage.setItem('userData', JSON.stringify(response));
        console.log(response);
        console.log(localStorage.getItem('userData'));

        // Add a 2-second delay before redirecting
        setTimeout(() => {
          // Redirect based on role
          if (response.role === 'farmer') {
            this.router.navigate(['/farmer-dashboard']);
          } else if (response.role === 'dealer') {
            this.router.navigate(['/dealer-dashboard']);
          }
        }, 2000); // 2 seconds
      },
      (error) => {
        // Handle error response
        this.errorMessage =
          error.error?.message || 'Invalid credentials. Please try again.';
      }
    );
  }
}
