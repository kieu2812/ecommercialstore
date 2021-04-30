import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
/*   templateUrl: './product-list.component.html',
 */
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  currentCategoryId: number = 1;
  previousCategoryId: number =1;
  productList: Product[]=[];
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number=1;
  theTotalElements:number =0;
  thePageSize: number=10;
  constructor( private productService: ProductService,
              private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () =>{
      this.listProducts();

    })
  }
  listProducts(){
    this.searchMode= this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    }
    else
      this.handleListProduct();
  }

  handleSearchProduct() {
    const theKeyWord:string =  this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(theKeyWord).subscribe(
      data => {
        this.productList= data;
      }
    );
  }

  handleListProduct(){
  //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId=1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId =  this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    // this.productService.getProducts(this.currentCategoryId).subscribe( 
    //   data => {
    //     this.productList =  data;
    //   }
    // );

    this.productService.getProductsPaginate(
          this.thePageNumber-1,
          this.thePageSize,
          this.currentCategoryId)
        .subscribe(this.processResult() );
    console.log(this.productList);
    console.log(this.thePageNumber);
    console.log(this.thePageSize);
    console.log(this.theTotalElements);
  }
  processResult(){
    return data =>{
      this.productList = data._embedded.product;
      this.thePageNumber =  data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
