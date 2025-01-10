import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable validation globally
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Automatically strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }));

    app.enableCors({
      origin: 'http://localhost:8080', // Ganti dengan URL frontend Anda
      credentials: true, // Jika diperlukan
    });
  
    

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
