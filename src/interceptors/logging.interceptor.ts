import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;
    console.log(`[Request] ${method} ${url} - Incoming request`);

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `[Response] ${method} ${url} - Handled in ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
