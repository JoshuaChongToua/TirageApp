import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable, startWith } from 'rxjs';
import { environment } from "../../../environment/environment.development";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

    const token = sessionStorage.getItem('token-auth');

    if (req.url !== environment.apiURL + '/api/login_check' && req.url !== environment.apiURL + '/register') {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        });
      console.log('Request with token:', authReq);
        return next(authReq);
    }
    else {
        //console.log('requete interceptée')
        const authReq = req;
        return next(authReq);
    }
}
