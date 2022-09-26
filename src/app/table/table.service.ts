import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get("http://localhost:8090/api/v/emp/get-emp");
  }

  createEmployees(data: any): Observable<any>{
    return this.http.post("http://localhost:8090/api/v/emp/save-new",data);
  }

  //To get the Employee object selected by ID
  getEmployeeById(id: number): Observable <any>{
    return this.http.get(`${"http://localhost:8090/api/v/emp/employee"}/${id}`);
  }

  // Return all avialable branches
  getAllBranches(){
    return this.http.get("http://localhost:8090/api/v/emp/get-branches");
  }
  
  updateEmployee(id: number,data: any): Observable<any>{
    return this.http.put(`${"http://localhost:8090/api/v/emp/update-user"}/${id}`,data);
  }

  // Return all avialable user types
  getAllUserTypes(){
    return this.http.get("http://localhost:8090/api/v/type/all");
  }
  
}
