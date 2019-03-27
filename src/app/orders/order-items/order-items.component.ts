import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
formDataItem : OrderItem;
itemList : Item[];
isValid : boolean =true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<OrderItemsComponent>,
    private itemsService :ItemService,
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.itemsService.getItemList().then(res =>this.itemList = res as Item[]);
    if(this.data.OrderItemIndex == null){
      this.formDataItem ={
        OrderItemID:null,
        OrderID :this.data.OrderID,
        ItemID:0,
        ItemName :"",
        Price:0, 
        Quantity :0,
        Total : 0
    }
    }else{
      this.formDataItem = Object.assign({},this.orderService.orderItems[this.data.OrderItemIndex]);
    }

  }

  updatePrice(ctrl){
    if(ctrl.selectedIndex == 0)
    {
      this.formDataItem.Price =0;
      this.formDataItem.ItemName ='';
    }
    else
    {
      this.formDataItem.Price = this.itemList[ctrl.selectedIndex-1].Price;
      this.formDataItem.ItemName = this.itemList[ctrl.selectedIndex-1].Name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formDataItem.Total =parseFloat((this.formDataItem.Quantity * this.formDataItem.Price).toFixed(2));
  }

  onSubmit(itemform : NgForm){
    if(this.validateForm(itemform.value)){
      if(this.data.OrderItemIndex == null){
        this.orderService.orderItems.push(itemform.value);
        
      }else{
        this.orderService.orderItems[this.data.OrderItemIndex]=itemform.value;
      }
      this.dialogRef.close();
    }
    
  }
validateForm(formDataItem : OrderItem){
  this.isValid = true;
  if(formDataItem.ItemID ==0)
    this.isValid = false;
  else if(formDataItem.Quantity ==0)
    this.isValid = false;
  return this.isValid;
}
}
