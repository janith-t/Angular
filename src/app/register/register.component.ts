import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  firstFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required,Validators.minLength(4)]],
    lastName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  // new
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  getData(){
    console.log("Name Entered: "+this.firstFormGroup.value["firstName"]+" "
    +this.firstFormGroup.value["lastName"]);
    alert("Name Entered: "+this.firstFormGroup.value["firstName"]+" "
    +this.firstFormGroup.value["lastName"]);
  }
  
}
