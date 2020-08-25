import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductTableItem } from '../product-table/product-table-datasource';
@Injectable({
  providedIn: 'root'
})
export class CreateUpdateProductService {
  baseURL = "http://localhost:8081/products/";
  constructor(private http:HttpClient) { }

  getProduct(id){
    return this.http.get<ProductTableItem>(this.baseURL+id);
  }

  addNewProduct(name,price){
    return this.http.post(this.baseURL+"addProduct/",{"name":name,"price":price});
  }

  updateProduct(id,name,price){
    return this.http.put(this.baseURL+"updateProduct/",{"idToFind":id,"name":name,"price":price});
  }
}
