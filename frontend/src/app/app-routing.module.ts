import { LoginComponent } from './login/login.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:ProductTableComponent},
  {path:'login',component:LoginComponent},
  {path:'addOrUpdate/:id',component:CreateUpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
