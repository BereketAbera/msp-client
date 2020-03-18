import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable"
import {Refer} from "../model/refer";
import {UserService} from "./user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize,map} from "rxjs/operators";
import {of} from "rxjs/observable/of";



export class RefersDataSource implements DataSource<Refer> {

    private productsSubject = new BehaviorSubject<Refer[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    
    public count:number;
    constructor(private userService: UserService) {

    }
    loadRefers(filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.userService.listRefers(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(products => {
                this.count = this.userService.countSubject.value;
                this.productsSubject.next(products);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Refer[]> {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

}



