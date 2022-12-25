import {ApiBodyOptions} from '@nestjs/swagger/dist/decorators/api-body.decorator';
import {ApiOperationOptions} from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import {ApiResponseOptions} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import {Socket} from 'socket.io';
import {User} from './services/user/user.model';

export interface ISwaggerConfig {
  apiBody?: ApiBodyOptions;
  apiOperation?: ApiOperationOptions;

  apiOkResponse?: ApiResponseOptions;
  apiCreatedResponse?: ApiResponseOptions;
  apiAcceptedResponse?: ApiResponseOptions;
  apiNoContentResponse?: ApiResponseOptions;
  apiMovedPermanentlyResponse?: ApiResponseOptions;
  apiFoundResponse?: ApiResponseOptions;
  apiBadRequestResponse?: ApiResponseOptions;
  apiUnauthorizedResponse?: ApiResponseOptions;
  apiTooManyRequestsResponse?: ApiResponseOptions;
  apiNotFoundResponse?: ApiResponseOptions;
  apiInternalServerErrorResponse?: ApiResponseOptions;
  apiBadGatewayResponse?: ApiResponseOptions;
  apiConflictResponse?: ApiResponseOptions;
  apiForbiddenResponse?: ApiResponseOptions;
  apiGatewayTimeoutResponse?: ApiResponseOptions;
  apiGoneResponse?: ApiResponseOptions;
  apiMethodNotAllowedResponse?: ApiResponseOptions;
  apiNotAcceptableResponse?: ApiResponseOptions;
  apiNotImplementedResponse?: ApiResponseOptions;
  apiPreconditionFailedResponse?: ApiResponseOptions;
  apiPayloadTooLargeResponse?: ApiResponseOptions;
  apiRequestTimeoutResponse?: ApiResponseOptions;
  apiServiceUnavailableResponse?: ApiResponseOptions;
  apiUnprocessableEntityResponse?: ApiResponseOptions;
  apiUnsupportedMediaTypeResponse?: ApiResponseOptions;
  apiDefaultResponse?: ApiResponseOptions;
}

export type TEditDto<T, K extends keyof T = 'id'> = Partial<T> & Pick<T, K>;

export type TAuthorizedSocket = Socket & {user: User};
