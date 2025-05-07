import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfigModule } from './swagger-config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*',
  });

  const PORT = process.env.PORT ?? 3001;
  app.setGlobalPrefix('api');

  SwaggerConfigModule.setup(app);

  await app.listen(PORT, '0.0.0.0');
}
void bootstrap();
