import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  deliveryDetails = {
    name: '',
    email: '',
    phone: '',
    address: '',
    acceptTerms: false,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.deliveryDetails.name = JSON.parse(userData).name;
      this.deliveryDetails.email = JSON.parse(userData).email;
    }
  }

  loadCart(): void {
    // Replace with your service logic
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.pricePerUnit * item.quantity,
      0
    );
  }

  onSubmit(): void {
    this.startPayment();
  }

  startPayment(): void {
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: this.totalAmount * 100,
      currency: 'INR',
      name: 'AgriMarket',
      description: 'Order Payment',
      handler: (response: any) => {
        this.paymentSuccess(response);
      },
      prefill: {
        name: this.deliveryDetails.name,
        email: 'user@example.com',
        contact: this.deliveryDetails.phone,
      },
      theme: {
        color: '#3399cc',
      },
    };

    // const rzp = new Razorpay(options);
    // rzp.open();
  }

  paymentSuccess(response: any): void {
    console.log('Payment Successful!', response);
    // Save order to backend here
    this.router.navigate(['/order-success']);
  }
}
