import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception.response && exception.status) {
      return throwError(exception);
    }

    return throwError({
      response: exception,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
