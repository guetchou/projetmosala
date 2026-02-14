import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Préfixe global pour toutes les routes API
  app.setGlobalPrefix('mosala-api');

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Mosala API')
    .setDescription("Documentation de l’API Mosala")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('mosala-api/docs', app, document);

  // Port personnalisé (par défaut 3000)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
