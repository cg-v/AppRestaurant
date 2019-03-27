import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItem } from 'src/app/shared/order-item.model';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
customerList :Customer[];
isValidOrder :boolean =true;
fullorderList :Order[];
  constructor(private orderService :OrderService,
    private dialogue :MatDialog,
    private customerService : CustomerService,
    private toastr :ToastrService,
    private router : Router,
    private currentRoute : ActivatedRoute) { }

  ngOnInit() {
    let orderId= this.currentRoute.snapshot.paramMap.get('id');
    if(orderId == null)
      this.resetForm();
    else{
     /*  this.orderService.getOrderById(parseInt(orderId)).then(res =>{
       this.orderService.formData= res;
       this.orderService.orderItems= res;

       }); */
 
    }

    this.customerService.getCustomerList().then(res =>this.customerList = res as Customer[]);
  }
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.orderService.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
     // DeletedOrderItemIDs: ''
    };
    this.orderService.orderItems = [];
}

AddOrEditOrderItem(OrderItemIndex,OrderId){
  const dialogConfig= new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width = "50%";
  dialogConfig.data = {OrderItemIndex,OrderId};
this.dialogue.open(OrderItemsComponent,dialogConfig).afterClosed().subscribe(res =>{
  this.updateGrandTotal();
});
}
onDeleteOrderItem(orderitemId :number,i : number){
  this.orderService.orderItems.splice(i,1);
  this.updateGrandTotal();
}

updateGrandTotal(){
  this.orderService.formData.GTotal= this.orderService.orderItems.reduce((prev,curr) => {
    return prev+curr.Total
  },0);
  this.orderService.formData.GTotal =parseFloat((this.orderService.formData.GTotal).toFixed(2));
}

validateForm(){
  this.isValidOrder =true;
  if(this.orderService.formData.CustomerID==0){
    this.isValidOrder = false;
  }
  else if(this.orderService.orderItems.length ==0){
    this.isValidOrder = false;
  }
  return this.isValidOrder;
}

onSubmit(form : NgForm){
if(this.validateForm()){
this.orderService.saveOrUpdateOrder().subscribe(res =>{
  this.resetForm();
  this.toastr.success('Submitted Successfully', 'Restaurant App');
 // this.router.navigate(['/orders'])
})
}
}
}
