import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crop } from '../components/crops/crops.model';

@Injectable({
  providedIn: 'root'
})
export class CropService {
    private baseUrl = 'http://localhost:8082/crops'; // Update with your backend URL
  
    constructor(private http: HttpClient) {}
  
    getAllCrops(farmerId: string): Observable<Crop[]> {
      return this.http.get<Crop[]>(`${this.baseUrl}/farmer/${farmerId}`);
    }
  
    addCrop(crop: Crop): Observable<Crop> {
      return this.http.post<Crop>(`${this.baseUrl}/add`, crop);
    }
  
    updateCrop(cropId: string, crop: Crop): Observable<Crop> {
      return this.http.put<Crop>(`${this.baseUrl}/${cropId}`, crop);
    }
  
    deleteCrop(cropId: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${cropId}`);
    }
  }

 
  