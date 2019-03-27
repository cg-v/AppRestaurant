import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  rootUrl:string ='http://localhost:3000/Customer';
  constructor(private http :HttpClient) { }

  getCustomerList(){
    return this.http.get(this.rootUrl).toPromise();
  }
}
