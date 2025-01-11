import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from './orders.model';
import { OrderService } from '../../services/order.service';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";



@Component({
  selector: 'app-orders',
  standalone: true, // Use `standalone: true` to allow `imports` directly
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'], // Fix: corrected to `styleUrls` (plural)
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  farmerId: string | null = null;

  constructor(private orderService: OrderService) {} // Fix: corrected the typo `cconstructor` to `constructor`

  ngOnInit(): void {
    // Retrieve farmerId from localStorage
    const userData = localStorage.getItem('userData');
    this.farmerId = userData ? JSON.parse(userData).roleId : null;

    if (this.farmerId) {
      this.orderService.getEnrichedOrders(this.farmerId).subscribe({
        next: (orders) => (this.orders = orders),
        error: (err) => console.error('Failed to fetch orders', err),
      });
    } else {
      console.error('Farmer ID not found in localStorage');
    }
  }

  viewInvoice(order: Order): void {
    this.selectedOrder = order;
  }

  closeInvoice(): void {
    this.selectedOrder = null;
  }
}
