import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems: CartItem[]=[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItem: CartItem){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if(this.cartItems.length>0){
      // for(let item of this.cartItems){
      //   if(item.id === theCartItem.id){
      //   //  alreadyExistsInCart= true;
      //     existingCartItem= item;
      //     break;

      //   }
      // }
      existingCartItem =  this.cartItems.find( tempCartItem => tempCartItem.id===theCartItem.id);
      alreadyExistsInCart = (existingCartItem!=undefined);

    }

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }


    //compute totalQuantity and totalPrice
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number=0;
    let totalQuantityValue: number= 0;
    for( let currCartItem of this.cartItems){
      totalPriceValue +=  currCartItem.unitPrice * currCartItem.quantity;
      totalQuantityValue += currCartItem.quantity;
    }
    //pulish the new values.. to all subcribers. They will receive the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    for( let currCartItem of this.cartItems){
      const subTotalPrice =  currCartItem.unitPrice * currCartItem.quantity;
      console.log(`name: ${currCartItem.name}, quantity: ${currCartItem.quantity}, unitPrice: ${currCartItem.unitPrice}, subTotal:${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('--------');
  }
  
  removeCartItem(removeItem: CartItem) {
    const itemIndex =  this.cartItems.findIndex( item => item.id === removeItem.id );

    // if found it
    if(itemIndex > -1){
      // remove at itemIndex , 1 element
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }

  }
}

