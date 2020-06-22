import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Picture } from "../model/picture";
import { AuthService } from "./auth.service";
import { UploadService } from "./upload.service";

@Injectable()
export class GalleryResolverService implements Resolve<Picture[]> {
  constructor(
    private uploadSerice: UploadService,
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Picture[]> | Observable<never> {
    this.authService.progressBarActive.next(true);
    return this.uploadSerice.listImages().pipe(
      mergeMap((pictures) => {
        if (pictures) {
          this.authService.progressBarActive.next(false);
          return of(pictures);
        } else {
          // id not found
          this.authService.progressBarActive.next(false);

          this.router.navigate(["./gallery/upldimg"]);
          return EMPTY;
        }
      })
    );
  }
}
