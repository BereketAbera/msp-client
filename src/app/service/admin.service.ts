import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const adminApi = environment.APIEndpoint;

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getFilteredBuyers(obj): Observable<any> {
    let param = this.generateParams(obj);
    return this.http.get(adminApi + `accounts/buyer/filter?${param}`);
  }

  getActiveConfiguration(): Observable<any> {
    return this.http.get(adminApi + `config`);
  }

  updateActiveConfiguration(body): Observable<any> {
    return this.http.put(adminApi + `config`, body);
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

  getAssistants(page): Observable<any> {
    return this.http.get(`${environment.APIEndpoint}accounts/assistants?page=${page}`);
  }

  addAssistant(assistant): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}accounts/assistants`, assistant);
  }

  changePassword(changePassword): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}accounts/update_password`, changePassword);
  }
}
