import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {initializeTransactionalContext} from "typeorm-transactional";

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // IMPORTANT: turn on type auto-transformation
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('Class-Control')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: process.env.VITE_WEB_URL, // allow front-end access
    credentials: true, // use authentication
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
