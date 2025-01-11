export interface Crop {
    id?: string; // Optional for new crops
    farmerId: string;
    name: string;
    quantity: number;
    reservedQuantity?: number; // Optional
    pricePerUnit: number;
    soilType: string;
    dateOfHarvest: string;
    status?: string; // Optional, default is "Available"
  }
  