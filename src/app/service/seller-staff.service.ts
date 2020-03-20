import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SellerStaffService {
  constructor(private http: HttpClient) {}

  addStaff(staff): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}accounts/staffs`, staff);
  }

  getStaffs(): Observable<any> {
    return this.http.get(`${environment.APIEndpoint}accounts/staffs`);
  }

  updateStaff(staff): Observable<any> {
    return this.http.post(
      `${environment.APIEndpoint}accounts/update_staff`,
      staff
    );
  }
}
