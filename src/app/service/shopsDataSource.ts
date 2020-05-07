import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable"
import {Shop} from "../model/shop";
import {ShopsService} from "./shops.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize,map} from "rxjs/operators";
import {of} from "rxjs/observable/of";



export class ShopsDataSource implements DataSource<Shop> {

    private shopsSubject = new BehaviorSubject<Shop[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    
    public count:number;
    constructor(private shopService: ShopsService) {

    }

    loadShops(usrId:number,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.shopService.listShops(usrId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(shops => {
                this.count = this.shopService.countSubject.value;
                this.shopsSubject.next(shops);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Shop[]> {
        //console.log("Connecting data source");
        return this.shopsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.shopsSubject.complete();
        this.loadingSubject.complete();
    }

}

