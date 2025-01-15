import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService {
private cartKey = 'cart';  // Key for storing the cart in localStorage

  constructor() {}

  // Get the current cart from localStorage
  getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  // Add a new crop to the cart or update its quantity if it exists
  addToCart(cartItem: any): void {
    console.log('Adding to cart:', cartItem);
    let cart = this.getCart();

    // Check if crop already exists in the cart
    const existingItem = cart.find((item: any) => item.id === cartItem.id);

    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    // Save updated cart to localStorage
    this.saveCart(cart);
  }


decreaseQuantity(cartItem: any): void {
  {
    console.log('Decreasing quantity:', cartItem);
    let cart = this.getCart();
    
      const existingItem = cart.find((item: any) => item.id === cartItem.id);
      if(existingItem.quantity===1){
        this.removeFromCart(cartItem.id);
        return;
      }
      existingItem.quantity -= cartItem.quantity;
      this.saveCart(cart);
  }}

  // Save the cart to localStorage
  saveCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    console.log('Cart updated:', cart);
  }

  // Remove an item from the cart
  removeFromCart(itemId: string): void {
    console.log('Removing from cart:', itemId);
    let cart = this.getCart();
    cart = cart.filter((item: any) => item.id !== itemId);
    this.saveCart(cart);
  }

  // Get the total price of the items in the cart
  getTotalAmount(): number {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
  }
}
