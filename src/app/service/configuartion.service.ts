import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const adminApi = environment.APIEndpoint;

@Injectable({
  providedIn: "root",
})
export class ConfiguartionService {
  configData: any = {
    id: 1,
    distanceKM: 20,
    talguuMarkup: 5,
    sellerRefReferrerCredit: 50,
    buyerRefReferrerCredit: 5,
    buyerRefReferredCredit: 15,
    socialRefReferredCredit: 15,
    socialRefReferrerCredit: 2,
    noRefCredit: 15,
    active: true,
  };

  constructor(private http: HttpClient) {}

  loadConfigurationData(): Promise<any> {
    return this.http
      .get<any>(adminApi + `config`)
      .toPromise()
      .then((result) => {
        // console.log(result)
        this.configData = result;
      });
  }
}
