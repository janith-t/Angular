import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../table/table.service';
//import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateEmp:any;

  empForm!: FormGroup; // display data

  empNo!: number;

 
  branches: any[]=[];

  userTypes: any[]=[]; // stores the list of available user types

  options: string[] = ['Active', 'Disabled', 'Terminated']; // for the status

  currentStatus:String ="";
  //opt2: Map<BigInteger,Object>= new Map;



  constructor(private service:TableService,private router:Router,
    private activatedroute:ActivatedRoute,private empManagementForm: FormBuilder,
    private _snackBar: MatSnackBar) { }
  // ActivatedRoute catches the data coming from the URL, Here we have sent the Employers ID
  
  
  ngOnInit(): void {

    this.empForm = this.empManagementForm.group({
      name: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      //type: new FormControl(''),
      type1: new FormControl(''),
      //branch: new FormControl(''),
      branch1: new FormControl(''),
      status: new FormControl(''),
      status1: new FormControl('')
    })

    this.empNo=this.activatedroute.snapshot.params['id'];
    this.getSelectedEmployee();
    this.fillAllBranches();
    this.fillUserTypes();
    //console.log("Employee no : "+this.empNo);
    //this.empNo=this.activatedroute.snapshot.params.get('id');
  }

  getSelectedEmployee(){
    this.service.getEmployeeById(this.empNo).subscribe((response:any)=>{
      //console.log("Response: "+response.branchName);
      this.updateEmp=response;
      //console.log("selected Employee: "+this.updateEmp);
      this.setEmployeeData(this.updateEmp);
    });
  }

  setEmployeeData(param:any){
    //console.log("param : "+param.branch);
    this.currentStatus = param?.status;
    this.empForm.patchValue({
      name:param?.name,
      address:param?.address,
      email:param?.email,
      mobile:param?.mobile,
      type:param?.usertypeName,
      type1:param?.tid,
      branch:param?.branchName,
      branch1:param?.bid,
      status:param?.status
      //status2:param?.status
    })
  }


  // Get all branches details from back-end and assign the same to the branches array.
  fillAllBranches(){
    this.service.getAllBranches().subscribe((response: any)=>{
    this.branches=response;
    //console.log(this.branches);
    });
  }

  // Get all user types details from back-end and assigning the same to the userTypes array.
  fillUserTypes(){
    console.log("fillUserTypes calling");
    this.service.getAllUserTypes().subscribe((response: any)=>{
      this.userTypes=response;
      //console.log(this.userTypes);
      });
  }
  


  updateEmployee(){
    const payLoad = {
    
      name: this.empForm.value.name,
      address: this.empForm.value.address,
      email: this.empForm.value.email,
      mobile: this.empForm.value.mobile,
      //type: this.empForm.value.type,
      type: this.empForm.value.type1,
      //branch: this.empForm.value.branch,
      branch: this.empForm.value.branch1,
      status: this.empForm.value.status1
    }

    this.service.updateEmployee(this.empNo,payLoad).subscribe((response: any)=>{
      console.log("Your record "+response.name+" is updated");
      this._snackBar.open("Your record "+response.name+" is updated", "OK",{
        duration: 3000
      });
      this.empForm.reset();
      this.currentStatus="";
      this.router.navigateByUrl('table');
    });
  }

 
}
