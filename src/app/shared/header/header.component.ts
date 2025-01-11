import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router ) {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToDashboard() {
    this.router.navigate(['/farmer-dashboard']);
  }

  navigateToCrops() {
    this.router.navigate(['/crops']);
  }
  navigateToOrders() {  
    this.router.navigate(['/orders']);
  }

  logout() {
    localStorage.removeItem('userData'); // Clear only user-specific data
    this.router.navigate(['/login']); // Navigate to login page
  }

}
