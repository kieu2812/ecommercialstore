import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MystoreFormService } from '../../services/mystore-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalQuantity: number =0;
  totalPrice: number =0;
  creditCardMonths: number[] =[];
  creditCardYears: number[] = [];
  constructor(private formBuilder: FormBuilder, private myStoreFormService: MystoreFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipcode: ['']      
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipcode: ['']      
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        cardName: [''],
        cardNumber: [''],
        securityCode: [''],
        expireMonth: [''],
        expireYear:['']  
      })    
    });

    let currentMonth =  new Date().getMonth() +1;
    this.myStoreFormService.getMonthsForExpireMonth(currentMonth).subscribe(
      (data =>{
        console.log("creditcard months: "+ JSON.stringify(data));
        this.creditCardMonths = data;
      }),
      (error => {
        alert("Error when get credit card months" );
        console.log(error);
      })
    );
    
    this.myStoreFormService.getYearForExpireYear().subscribe(
      (data =>{
        console.log("creditcard year: "+ JSON.stringify(data));
        this.creditCardYears = data;
      }),
      (error => {
        alert("Error when get credit card months" );
        console.log(error);

      })
    )
  }

  onSubmit(){
    console.log("handle submit button in check ou form")
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);
  }

  copyShippingAddressToBillingAddress(event){
      if(event.target.checked){
        this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      }
      else{
        this.checkoutFormGroup.controls.billingAddress.reset();
      }
  }

  changeExpireYear(event){
    const expireYear: number =  event.target.value;
    const currentYear: number =  new Date().getFullYear();

    console.log("Selected expired year: "+ expireYear+" currentYear:" + currentYear);

    if(expireYear!= currentYear){

      
      this.myStoreFormService.getMonthsForExpireMonth(1).subscribe(
        (data =>{
          console.log("creditcard months: "+ JSON.stringify(data));
          this.creditCardMonths = data;
        }),
        (error => {
          alert("Error when get credit card months" );
          console.log(error);
        })
      );
    }
    else{
      let currentMonth =  new Date().getMonth() +1;
      this.myStoreFormService.getMonthsForExpireMonth(currentMonth).subscribe(
        (data =>{
          console.log("creditcard months: "+ JSON.stringify(data));
          this.creditCardMonths = data;
        }),
        (error => {
          alert("Error when get credit card months" );
          console.log(error);
        })
      );
    }
  }
}
