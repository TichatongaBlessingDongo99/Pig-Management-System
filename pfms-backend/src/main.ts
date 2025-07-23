import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting PFMS Backend...');
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Pig Farm Management System')
    .setDescription('High-Grade Pig Farming Management System API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('farms', 'Farm management')
    .addTag('pigs', 'Pig management')
    .addTag('batches', 'Batch management')
    .addTag('pens', 'Pen management')
    .addTag('health', 'Health records')
    .addTag('feeding', 'Feeding logs')
    .addTag('dashboard', 'Dashboard analytics')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`🔐 Auth Login: POST http://localhost:${port}/api/auth/login`);
  console.log(`🏠 Farms API: GET http://localhost:${port}/api/farms`);
  console.log(`🐷 Pigs API: GET http://localhost:${port}/api/pigs`);
}
bootstrap();
