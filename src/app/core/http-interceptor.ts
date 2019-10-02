import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      // Prevent caching in IE, in particular IE11, but also EDGE. Although caching in Edge is primarily
      // due to Web API residing on server (workstation) not in TRUSTED SITES (Internet Properties/Security)
      // When running Web API from code, EDGE is able to access XmlHttpRequest calls.
      setHeaders: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    return next.handle(authReq);
  }
}