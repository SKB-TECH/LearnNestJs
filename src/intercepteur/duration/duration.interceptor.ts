import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log(`date de lancement de la requette ${dateIn}`);
    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log(`date de finition de la requette ${dateOut}`);
        console.log(`duree de la requette ${dateOut - dateIn} ms`);
      }),
    );
  }
}
