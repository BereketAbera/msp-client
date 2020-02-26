
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable"
import {BuyerTransaction} from "../model/buyer-transaction";
import {TransactionService} from "./transaction.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize,map} from "rxjs/operators";
import {of} from "rxjs/observable/of";

export class BuyerTransactionsDataSource implements DataSource<BuyerTransaction> {

    private productsSubject = new BehaviorSubject<BuyerTransaction[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    
    public count:number;
    constructor(private transactionService: TransactionService) {

    }
    loadTransactions(usrId:number,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.transactionService.listBuyerTransactions(usrId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(buyerTrnsct => {
                this.count = this.transactionService.countSubject.value;
                this.productsSubject.next(buyerTrnsct);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<BuyerTransaction[]> {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

}

