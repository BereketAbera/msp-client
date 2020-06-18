import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

const referralEndPoint = environment.APIEndpoint + "refercode";

@Injectable({
  providedIn: "root",
})
export class SocialReferralService {
  constructor(private http: HttpClient) {}

  getBuyerReferralList(): Observable<any> {
    return this.http.get(referralEndPoint);
  }

  getAdminCodeList(pageNumber, pageSize): Observable<any> {
    return this.http.get(
      referralEndPoint +
        `/admin_codes?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
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
}
