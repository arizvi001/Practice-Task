import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductTableComponent } from './product-table/product-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { ProductTableService } from './product-table/product-table.service';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import {CreateUpdateProductService } from './create-update-product/create-update-product.service'
@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    CreateUpdateProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProductTableService,
    CreateUpdateProductService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
