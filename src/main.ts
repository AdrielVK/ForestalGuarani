import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationsInterface } from './interfaces/configuration.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

export let app: INestApplication;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  const configService = app.get(ConfigService<ConfigurationsInterface>);

  if (configService.get<string>('ENVIRONMENT')?.toUpperCase() === 'LOCAL') {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Administacion Forestal')
      .setDescription('Administracion integral forestal')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(configService.get('GLOBAL_PREFIX'), app, document);
  }
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(configService.get('PORT'));
}
bootstrap();
