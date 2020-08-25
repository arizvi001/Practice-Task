import { CreateUpdateProductService } from './create-update-product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {forbiddenPriceValidator} from './shared/price-validator';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductTableItem } from '../product-table/product-table-datasource';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.css']
})
export class CreateUpdateProductComponent implements OnInit {
  public id;
  public isCreatePage:boolean;
  myForm = this.fb.group({
    name: ['',Validators.required],
    price: ['',[Validators.required,forbiddenPriceValidator]]
  });



  get name(){
    return this.myForm.get('name');
  }

  get price(){
    return this.myForm.get('price');
  }

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private _myService:CreateUpdateProductService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isCreatePage = (this.id == -1 ? true:false);
    if(!this.isCreatePage){
      this._myService.getProduct(this.id)
      .subscribe(
        (data:ProductTableItem)=>{
          this.myForm.controls['name'].setValue(data.name);
          this.myForm.controls['price'].setValue(data.price);
        }
      );
    }
  }

  createProduct(name:string,price:number){
    this._myService.addNewProduct(name,price).
    subscribe((data)=>alert(data));
  }


  updateProduct(id:string,name:string,price:number){
    this._myService.updateProduct(id,name,price).
    subscribe((data)=>alert(data));
  }

  onSubmit(data){
    if(this.id == -1){
      this.createProduct(data.name,data.price);
    }
    else{
      this.updateProduct(this.id,data.name,data.price)
    }
    this.router.navigate(['/']);
  }



}
