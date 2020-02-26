import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        if (this.auth.isLoggedIn()) {
            const authToken = this.auth.getToken();
            if (authToken) {
                const authReq = req.clone({
                    headers: req.headers.set("Authorization",
                        "Bearer " + authToken)
                });

                return next.handle(authReq);
            }
            else {
                return next.handle(req);
            }
        }
        else {
            return next.handle(req);
        }
    }
}