import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import type {INestApplication} from '@nestjs/common';

import {AppModule} from './app.module';
import {ValidationPipe} from './utils/validation.pipe';

const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE as string)
    .setDescription(process.env.SWAGGER_DESCRIPTION as string)
    .setVersion(process.env.SWAGGER_VERSION as string)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
};

const configureApplication = (app: INestApplication) => {
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const port: string = process.env.PORT as string;

  configureSwagger(app);
  configureApplication(app);

  await app.listen(port);
}

bootstrap();
