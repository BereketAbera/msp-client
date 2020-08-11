import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const referralEndPoint = environment.APIEndpoint + "refercode";

@Injectable({
  providedIn: "root",
})
export class SocialReferralService {
  constructor(private http: HttpClient) {}

  getBuyerReferralList(): Observable<any> {
    return this.http.get(referralEndPoint);
  }

  getAdminCodeList(obj): Observable<any> {
    let queryParams = this.generateParams(obj);
    return this.http.get(referralEndPoint + `/admin_codes?${queryParams}`);
  }

  generateNewCode(): Observable<any> {
    return this.http.get(referralEndPoint + "/generate_code?type=BUYER");
  }

  generateNewAdminCode(referredCredit): Observable<any> {
    return this.http.get(
      referralEndPoint +
        `/generate_admin_code?type=ADMIN&referredCredit=${referredCredit}`
    );
  }

  getUserSocialReferrals(pageSize, pageNumber): Observable<any> {
    return this.http.get(
      environment.APIEndpoint +
        `accounts/lstsocialrfrs?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
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
