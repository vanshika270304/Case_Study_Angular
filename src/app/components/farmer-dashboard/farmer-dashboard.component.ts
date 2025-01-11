import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-farmer-dashboard',
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.css'
})
export class FarmerDashboardComponent implements OnInit {
  
  farmerData: any;
  isProfileEditing: boolean = false;
  
  constructor(private router: Router) {}

    ngOnInit(): void {
      // Retrieve farmer data from localStorage
      console.log(localStorage.getItem('userData'));
      this.farmerData = localStorage.getItem('userData');
      console.log(this.farmerData);
    }

    navigateToProfile() {
      this.router.navigate(['/profile']);
    }

    navigateToCrops() {
      this.router.navigate(['/crops']);
    }
    navigateToOrders() {  
      this.router.navigate(['/orders']);
    }


}
