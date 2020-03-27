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

  getStaffs(page): Observable<any> {
    return this.http.get(
      `${environment.APIEndpoint}accounts/staffs?page=${page}`
    );
  }

  updateStaff(staff): Observable<any> {
    return this.http.post(
      `${environment.APIEndpoint}accounts/update_staff`,
      staff
    );
  }

  getFeatures(): Observable<any> {
    return this.http.get(`${environment.APIEndpoint}route_access/features`);
  }

  getUserFeatures(userId): Observable<any> {
    return this.http.get(
      `${environment.APIEndpoint}route_access/user_features/${userId}`
    );
  }

  addStaffRouteAccess(userId, featureId): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}route_access/add`, {
      userId,
      featureId
    });
  }

  removeStaffRouteAccess(obj): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}route_access/remove`, obj);
  }
}
