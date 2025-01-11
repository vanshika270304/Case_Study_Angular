import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApi = 'http://localhost:8083/orders';
  private cropApi = 'http://localhost:8082/crops';
  private userApi = 'http://localhost:8081/users'; // Used for fetching user details (farmer and dealer)

  constructor(private http: HttpClient) {}

  // Fetch all orders for the farmer
  getOrders(farmerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApi}/farmer/${farmerId}`);
  }

  // Fetch crop details
  getCropDetails(cropId: string): Observable<any> {
    return this.http.get<any>(`${this.cropApi}/${cropId}`);
  }

  // Fetch user details (including dealer name and phone)
  getUserDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.userApi}/profile/${userId}`);
  }

  // Fetch enriched orders with crop and dealer details
  getEnrichedOrders(farmerId: string): Observable<any[]> {
    return this.getOrders(farmerId).pipe(
      mergeMap((orders) =>
        forkJoin(
          orders.map((order) => {
            const crop$ = this.getCropDetails(order.cropId);
            console.log(order.dealerId);
            const user$ = this.http.get<any>(`${this.userApi}/dealer/${order.dealerId}`).pipe(
              map((response: any) => response.userId),  // Extract userId
              mergeMap((userId: string) => this.getUserDetails(userId)) // Fetch user details using userId
            );

            return forkJoin([crop$, user$]).pipe(
              map(([crop, user]) => ({
                ...order,
                cropName: crop.name,
                dealerName: user.name,  // Assuming user object contains dealer details
                dealerPhone: user.number,  // Assuming user object contains dealer phone
              }))
            );
          })
        )
      )
    );
  }
}
