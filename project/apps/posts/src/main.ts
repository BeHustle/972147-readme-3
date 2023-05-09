import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Posts» service')
    .setDescription('Posts service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const host = configService.get('application.host');
  const port = configService.get('application.port');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(port);
  Logger.log(`🚀 <<POSTS>> app is running on: http://${host}:${port}/${globalPrefix}`);
  Logger.log(`🚀 <<POSTS>> documentation on: http://${host}:${port}/spec`);
}

bootstrap();
