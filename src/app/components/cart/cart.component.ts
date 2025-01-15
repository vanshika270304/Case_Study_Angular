import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderDealerComponent } from "../header-dealer/header-dealer.component";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FooterComponent, HeaderDealerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  itemToDelete: any = null;

  constructor(private cartService: CartService,private router:Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.totalAmount = this.cartService.getTotalAmount();
  }

  increaseQuantity(item: any): void {
    this.cartService.addToCart({"id":item.id, "quantity": 1});
    this.loadCart();
  }

  decreaseQuantity(item: any): void {
      this.cartService.decreaseQuantity({"id":item.id, "quantity": 1});
      this.loadCart();
  }

  confirmDelete(item: any): void {
    this.itemToDelete = item;
  }

  cancelDelete(): void {
    this.itemToDelete = null;
  }

  deleteItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
    this.itemToDelete = null;
    this.loadCart();
  }

  navigateToCrops(): void {
    this.router.navigate(['/dealer-dashboard'], { fragment: 'crops-section' });
}

checkout(): void {
  this.router.navigate(['/checkout']);
}

}