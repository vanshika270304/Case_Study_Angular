export interface Order {
    orderId: string;
    dealerId: string;
    farmerId: string;
    cropId: string;
    quantity: number;
    totalPrice: number;
    orderStatus: string;
    orderDate: string;
  
    // Additional fields from enriched data
    cropName?: string;
    dealerName?: string;
    dealerPhone?: string;
  }
  