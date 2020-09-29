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

  getReferralLinkList({}): Observable<any> {
    return this.http.get(referralLinkURL);
  }
}
