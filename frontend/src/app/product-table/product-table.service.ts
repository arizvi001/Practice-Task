import { Observable } from 'rxjs';
import { ProductTableItem } from './product-table-datasource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductTableService {

  baseURL = "http://localhost:8081/products/";
  constructor(private http:HttpClient) { }

  getProducts(): Observable<ProductTableItem[]>{
    return  this.http.get<ProductTableItem[]>(this.baseURL);
  }

  getQueriedProducts(query:string): Observable<ProductTableItem[]>{
    return  this.http.get<ProductTableItem[]>(this.baseURL+"filterProduct/"+query);
  }


  deleteProduct(id){
    // console.log("link: "+this.baseURL+"deleteProduct/"+id);
    return this.http.delete(this.baseURL+"deleteProduct/"+id);
  }
}
