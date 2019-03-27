import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  rootUrl:string ='http://localhost:3000/Item';
  constructor(private http :HttpClient) { }

  getItemList(){
    return this.http.get(this.rootUrl).toPromise();
  }
}
