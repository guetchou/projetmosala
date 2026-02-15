import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Port personnalisé (par défaut 4002)
  await app.listen(process.env.PORT ?? 4002);
}
bootstrap();
