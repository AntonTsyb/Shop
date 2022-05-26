import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface ProductType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss'
  ],
})
export class AddProductPageComponent implements OnInit {
  form!: FormGroup
  matcher!: MyErrorStateMatcher
  submitted!: boolean
  types: ProductType[] = [
    { value: 'phone-0', viewValue: 'Phone' },
    { value: 'tablet-1', viewValue: 'Tablet' },
    { value: 'laptop-2', viewValue: 'Laptop' },
    { value: 'pc-3', viewValue: 'PC' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.submitted = false;
    this.matcher = new MyErrorStateMatcher();
    this.form = new FormGroup({
      "type": new FormControl(null, Validators.required),
      "title": new FormControl(null, Validators.required),
      "photo": new FormControl(null, Validators.required),
      "info": new FormControl(null, Validators.required),
      "price": new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
    }

    console.log(this.form);
  }
}
