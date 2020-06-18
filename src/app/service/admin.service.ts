import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const adminApi = environment.APIEndpoint;

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getFilteredBuyers(obj): Observable<any> {
    let param = this.generateParams(obj);
    return this.http.get(adminApi + `accounts/buyer/filter?${param}`);
  }

  generateParams(params) {
    let url = "";
    let keys = Object.keys(params);
    keys.map((key) => {
      if (params[key]) {
        url = url + `${key}=${params[key]}&`;
      }
    });

    return url.slice(0, url.length - 1);
  }
}
