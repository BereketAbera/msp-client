import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
 
import { UploadService }  from './upload.service';
import { Picture } from '../model/picture';
 
@Injectable({
  providedIn: 'root',
})
export class GalleryResolverService implements Resolve<Picture[]> {
  constructor(private uploadSerice: UploadService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Picture[]> | Observable<never> {
     return this.uploadSerice.listImages().pipe(
        mergeMap(pictures => {
        if (pictures) {
          return of(pictures);
        } else { // id not found
          this.router.navigate(['./gallery/upldimg']);
          return EMPTY;
        }
      })
    );
  }
}

