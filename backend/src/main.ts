import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import type {INestApplication} from '@nestjs/common';

import {AppModule} from './app.module';
import {ValidationPipe} from './utils/validation.pipe';

const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  configureSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
