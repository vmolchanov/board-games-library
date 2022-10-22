import {applyDecorators} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse, ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiGatewayTimeoutResponse,
  ApiGoneResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiMovedPermanentlyResponse,
  ApiNoContentResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiPreconditionFailedResponse,
  ApiRequestTimeoutResponse,
  ApiServiceUnavailableResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';

import {ISwaggerConfig} from './app';


export function UseSwagger(config: ISwaggerConfig) {
  const decorators = [];

  const propertyDecorators = {
    apiBody: ApiBody,
    apiOperation: ApiOperation,
    apiOkResponse: ApiOkResponse,
    apiCreatedResponse: ApiCreatedResponse,
    apiAcceptedResponse: ApiAcceptedResponse,
    apiNoContentResponse: ApiNoContentResponse,
    apiMovedPermanentlyResponse: ApiMovedPermanentlyResponse,
    apiFoundResponse: ApiFoundResponse,
    apiBadRequestResponse: ApiBadRequestResponse,
    apiUnauthorizedResponse: ApiUnauthorizedResponse,
    apiTooManyRequestsResponse: ApiTooManyRequestsResponse,
    apiNotFoundResponse: ApiNotFoundResponse,
    apiInternalServerErrorResponse: ApiInternalServerErrorResponse,
    apiBadGatewayResponse: ApiBadGatewayResponse,
    apiConflictResponse: ApiConflictResponse,
    apiForbiddenResponse: ApiForbiddenResponse,
    apiGatewayTimeoutResponse: ApiGatewayTimeoutResponse,
    apiGoneResponse: ApiGoneResponse,
    apiMethodNotAllowedResponse: ApiMethodNotAllowedResponse,
    apiNotAcceptableResponse: ApiNotAcceptableResponse,
    apiNotImplementedResponse: ApiNotImplementedResponse,
    apiPreconditionFailedResponse: ApiPreconditionFailedResponse,
    apiPayloadTooLargeResponse: ApiPayloadTooLargeResponse,
    apiRequestTimeoutResponse: ApiRequestTimeoutResponse,
    apiServiceUnavailableResponse: ApiServiceUnavailableResponse,
    apiUnprocessableEntityResponse: ApiUnprocessableEntityResponse,
    apiUnsupportedMediaTypeResponse: ApiUnsupportedMediaTypeResponse,
    apiDefaultResponse: ApiDefaultResponse,
  };

  for (let property in propertyDecorators) {
    if (config[property]) {
      decorators.push(propertyDecorators[property](config[property]));
    }
  }

  return applyDecorators(...decorators);
}
