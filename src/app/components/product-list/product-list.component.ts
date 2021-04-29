import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
/*   templateUrl: './product-list.component.html',
 */
  templateUrl: './product-list.component-table.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number;
  productList: Product[];

  constructor( private productService: ProductService,
              private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () =>{
      this.listProduct();

    })
  }
  listProduct(){
    //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId=1;
    }

    this.productService.getProducts(this.currentCategoryId).subscribe( 
      data => {
        this.productList =  data;
      }
    );
  }
}
