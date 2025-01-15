import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Crop } from './crops.model';
import { CropService } from '../../services/crop.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-crops',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './crops.component.html',
  styleUrl: './crops.component.css'
})
export class CropsComponent implements OnInit {
  crops: Crop[] = [];
  cropForm: FormGroup;
  farmerId: string | null = null;
  isModalOpen = false; // Modal visibility toggle
  isEditing = false;
  currentCropId: string | null = null;

  constructor(private cropsService: CropService, private fb: FormBuilder) {
    this.cropForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      pricePerUnit: [0.1, [Validators.required, Validators.min(0.1)]],
      soilType: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      dateOfHarvest: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.farmerId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!).roleId : null;
    if (this.farmerId) {
      this.loadCrops();
    } else {
      console.error('Farmer ID not found in local storage!');
    }
  }

  loadCrops(): void {
    if (this.farmerId) {
      this.cropsService.getAllCrops(this.farmerId).subscribe({
        next: (data) => (this.crops = data),
        error: (err) => console.error('Error loading crops:', err)
      });
    }
  }

  openModal(crop?: Crop): void {
    this.isModalOpen = true;
    this.isEditing = !!crop;
    if (crop) {
      this.currentCropId = crop.id!;
      this.cropForm.patchValue(crop);
    } else {
      this.cropForm.reset();
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.currentCropId = null;
    this.cropForm.reset();
  }

  saveCrop(): void {
    if (this.cropForm.valid && this.farmerId) {
      const cropData: Crop = { ...this.cropForm.value, farmerId: this.farmerId, status: 'Available'};

      if (this.isEditing && this.currentCropId) {
        console.log('Updating crop...', cropData);
        console.log('Current crop ID:', this.currentCropId);
        this.cropsService.updateCrop(this.currentCropId, cropData).subscribe({
          next: () => {
            alert('Crop updated successfully!');
            this.closeModal();
            this.loadCrops();
          },
          error: (err) => console.error('Error updating crop:', err)
        });
      } else {
        console.log('Adding crop...', cropData);
        this.cropsService.addCrop(cropData).subscribe({
          next: () => {
            alert('Crop added successfully!');
            this.closeModal();
            this.loadCrops();
          },
          error: (err) => console.error('Error adding crop:', err)
        });
      }
    }
  }

  deleteCrop(cropId: string): void {
    if (confirm('Are you sure you want to delete this crop?')) {
      this.cropsService.deleteCrop(cropId).subscribe({
        next: () => {
          alert('Crop deleted successfully!');
          this.loadCrops();
        },
        error: (err) => console.error('Error deleting crop:', err)
      });
    }
  }

  get f() {
    return this.cropForm.controls;
  }
}