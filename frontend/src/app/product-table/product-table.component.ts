import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductTableDataSource, ProductTableItem } from './product-table-datasource';
import { ProductTableService } from './product-table.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductTableItem>;
  dataSource: ProductTableDataSource;

  constructor(private _productService:ProductTableService,private router: Router,){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','price','actions'];

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(this._productService);
  }

  applyFilter(){
   let query = (document.getElementById('searchBox') as HTMLInputElement).value;
   if(query!=""){
     this._productService.getQueriedProducts(query)
        .subscribe(data => {
          this.dataSource.data = data;
        });
   }
  }

  removeProduct(productID){
    this._productService.deleteProduct(productID)
    .subscribe((data)=>{
      alert(data);
      window.location.reload();
    });

  }

  navigate(id){
    // console.log("in");
    this.router.navigate(['/addOrUpdate/'+id]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
