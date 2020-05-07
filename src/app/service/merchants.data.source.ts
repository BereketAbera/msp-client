import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable"
import { User } from "../model/user";
import { UserService } from "./user.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";



export class MerchantsDataSource implements DataSource<User> {

    private productsSubject = new BehaviorSubject<User[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public count: number;
    constructor(private userService: UserService) {

    }

    filterSeller(companyName, status, pageIndex, pageSize) {
        this.loadingSubject.next(true);

        this.userService.filterSeller(companyName,"","",status,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(products => {
                console.log(products,'psdf')
                this.count = this.userService.countSubject.value;
                this.productsSubject.next(products);
            });

    }
    loadMerchants(usrId: number,
        filter: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        this.userService.listMerchants(usrId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(products => {
                this.count = this.userService.countSubject.value;
                this.productsSubject.next(products);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        // console.log("Connecting data source");
        return this.productsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

}

