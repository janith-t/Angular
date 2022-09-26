import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableService } from './table.service';
import {MatPaginator} from '@angular/material/paginator';

//

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  //employee:any;

  dataSource=new MatTableDataSource([]);

  // constructor(private http:HttpClient) { }

  // ngOnInit(): void {
  //   let response=this.http.get("http://localhost:8090/api/v/emp/get-emp");
  //   response.subscribe((data)=>this.employee=data)
  // }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private service:TableService,private router:Router) { }

  
  ngOnInit(): void {
    this.service.getAllEmployees().subscribe((response: any)=>{
      this.dataSource=new MatTableDataSource(response);
      this.dataSource.paginator=this.paginator;
    });
  }

  


  displayedColumns: string[] = ['eid', 'name', 'address', 'email','mobile', 'type', 'branch', 'status','action'];
  //dataSource = 

  applyFilter(event:Event){
    //console.log("applyFilter calling")
    const filteValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filteValue.trim().toLowerCase();
  }

  doUpdate(emp:any){
    // 'emp' here take the selected table row's data set came early from the Backend
    // we take the id element of it(in here id came as eid) and pass the same through routing
    // to the desired routing element
    //console.log(emp);
    this.router.navigate([
      'update',emp.eid
    ]);
  }
}
