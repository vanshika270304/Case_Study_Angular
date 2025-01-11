import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  isEditing: boolean = false;
  errorMessage: string = ''; // For error messages during validation

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const storedData = localStorage.getItem('userData');
    this.userData = storedData ? JSON.parse(storedData) : null;

    if (!this.userData) {
      alert('No user data found. Redirecting to login...');
      this.router.navigate(['/login']);
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  validateForm() {
    // Validation logic
    if (!this.userData.name || !this.userData.email || !this.userData.number) {
      this.errorMessage = "All fields are required!";
      return false;
    }

    // Validate number (should be at least 10 digits)
    if (this.userData.number.length != 10) {
      this.errorMessage = "Phone number should be 10 digits.";
      return false;
    }

    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.userData.email)) {
      this.errorMessage = "Invalid email format.";
      return false;
    }

    // If no validation errors
    this.errorMessage = '';
    return true;
  }

  saveProfile() {
    if (this.validateForm()) {
      console.log('Updating profile...', this.userData);
      this.profileService.updateUserProfile(this.userData.id, this.userData).subscribe(
        (response) => {
          // On success
          console.log('Profile updated successfully!', response);
          localStorage.setItem('userData', JSON.stringify(this.userData));
          this.isEditing = false;
          alert('Profile updated successfully!');
          this.loadUserData();
        },
        (error) => {
          // On error
          console.error('Error updating profile', error);
          alert('Error updating profile.');
        }
      );
    }
  }

  cancelEdit() {
    this.loadUserData();
    this.isEditing = false;
  }

  goToDashboard() {
    this.router.navigate(['/farmer-dashboard']);
  }
}
