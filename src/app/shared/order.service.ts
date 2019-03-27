import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
formData : Order;
orderItems :OrderItem[];
rootUrl:string ='http://localhost:3000/Order';
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder(){
    var body={
      ...this.formData,
      OrderItems: this.orderItems
    };
   return this.http.post(this.rootUrl,body);
  }

  getOrderList(){
    return this.http.get(this.rootUrl).toPromise();
  }
  getOrderById(id:number):any{
   

    return this.http.get(this.rootUrl+'/'+id).toPromise();
    
  }
}
