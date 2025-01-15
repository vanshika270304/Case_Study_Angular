import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-dealer',
  imports: [],
  templateUrl: './header-dealer.component.html',
  styleUrl: './header-dealer.component.css'
})
export class HeaderDealerComponent {

  constructor(private router: Router) {}

  navigateToCrops(): void {
    this.router.navigate(['/dealer-dashboard'], { fragment: 'crops-section' });
}
    
  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToHome(): void {
    this.router.navigate(['/dealer-dashboard']);
  }

  logout() {
    localStorage.removeItem('userData'); // Clear only user-specific data
    localStorage.removeItem('cart'); // Clear cart items
    this.router.navigate(['/login']); // Navigate to login page
  }

}
