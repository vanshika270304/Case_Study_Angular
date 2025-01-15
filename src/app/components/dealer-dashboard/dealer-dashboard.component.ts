import { Component, OnInit } from '@angular/core';
import { CropService } from '../../services/crop.service';
import { FooterComponent } from "../../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HeaderDealerComponent } from "../header-dealer/header-dealer.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dealer-dashboard',
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, FormsModule, HeaderDealerComponent],
  templateUrl: './dealer-dashboard.component.html',
  styleUrl: './dealer-dashboard.component.css'
})
export class DealerDashboardComponent implements OnInit {
  crops: any[] = [];
  filteredCrops: any[] = [];
  cart: any[] = [];
  searchTerm = '';
  selectedSort = '';
  selectedCrop: any = null; // Crop selected for the modal
  requestedQuantity: number = 1; // Quantity input by the user
  errorMessage: string = '';

  constructor(private cropService: CropService,private cartService: CartService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.cropService.getCrops().subscribe((data) => {
      this.crops = data;
      this.filteredCrops = [...this.crops];
    });

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  filterCrops(): void {
    this.filteredCrops = this.crops.filter((crop) =>
      crop.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortCrops(): void {
    switch (this.selectedSort) {
      case 'priceAsc':
        this.filteredCrops.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case 'priceDesc':
        this.filteredCrops.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
      case 'quantityAsc':
        this.filteredCrops.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantityDesc':
        this.filteredCrops.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        this.filteredCrops = [...this.crops];
    }
  }


  scrollToCrops() {
    const cropsSection = document.getElementById('crops-section');
    if (cropsSection) {
      cropsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openQuantityModal(crop: any): void {
    this.selectedCrop = crop;
    this.requestedQuantity = 1;
    this.errorMessage = '';
  }

  closeModal(): void {
    this.selectedCrop = null;
  }

  confirmAddToCart(): void {
    if (this.requestedQuantity <= 0) {
      this.errorMessage = 'Please enter a valid positive number for the quantity.';
      return;
    }

    if (this.requestedQuantity > this.selectedCrop.quantity) {
      this.errorMessage = `The quantity exceeds the available stock. Only ${this.selectedCrop.quantity} units are available.`;
      return;
    }

    // Prepare cart item
    const cartItem = {
      id: this.selectedCrop.id,
      name: this.selectedCrop.name,
      pricePerUnit: this.selectedCrop.pricePerUnit,
      quantity: this.requestedQuantity,
    };

    // Add to cart
    this.cartService.addToCart(cartItem);

    // Close modal
    alert(`${this.requestedQuantity} units of ${this.selectedCrop.name} added to the cart.`);
    this.closeModal();
    
  }


}
