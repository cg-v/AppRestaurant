import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
finalOrderList;
  constructor(private orderService : OrderService,
    private router : Router) { }

  ngOnInit() {
    this.orderService.getOrderList().then(res => this.finalOrderList = res);
  }
  openForEdit(orderId :number){
    this.router.navigate(['order/edit/'+orderId]);
  }

}
