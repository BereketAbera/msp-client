import { query } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const referralLinkURL = environment.APIEndpoint + "referral_links";

@Injectable({
  providedIn: "root",
})
export class ReferralLinkServiceService {
  constructor(private http: HttpClient) {}

  createNewReferalLink(obj): Observable<any> {
    return this.http.post(referralLinkURL, obj);
  }

  getReferralLinkList(obj): Observable<any> {
    let queryParams = this.generateParams(obj);
    return this.http.get(`${referralLinkURL}?${queryParams}`);
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
