import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from '../table/table.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  empForm!: FormGroup;

  branches: any[] = [];

  userTypes: any[] = [];

  userStat: string[] = ['Active', 'Disabled', 'Terminated'];

  selected: String = 'Active';

  constructor(private empManagementForm: FormBuilder,
    private service: TableService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.empForm = this.empManagementForm.group({
      name: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      type: new FormControl(''),
      branch: new FormControl(''),
      status: new FormControl('')
    })
    this.fillAllBranches();
    this.fillUserTypes();
  }

  fillAllBranches() {
    this.service.getAllBranches().subscribe((response: any) => {
      this.branches = response;
    });
  }

  fillUserTypes() {
    console.log("fillUserTypes calling");
    this.service.getAllUserTypes().subscribe((response: any) => {
      this.userTypes = response;
    });
  }

  saveEmployee() {
    const payLoad = {
      name: this.empForm.value.name,
      address: this.empForm.value.address,
      email: this.empForm.value.email,
      mobile: this.empForm.value.mobile,
      type: this.empForm.value.type,
      branch: this.empForm.value.branch,
      status: this.empForm.value.status
    }

    this.service.createEmployees(payLoad).subscribe((response: any) => {
      console.log("Your record " + response.name + " is saved");
      this._snackBar.open("Your record " + response.name + " is saved", "OK", {
        duration: 3000
      });
      this.empForm.reset();
    });
  }

}
