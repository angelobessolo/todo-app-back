import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CASHUP RESTFULL API')
    .setDescription('DOCUMENTATION CASHUP ENDPOINTS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Aumentar el tamaño máximo de la carga útil
  app.use(bodyParser.json({ limit: '50mb' }));  // Aquí puedes ajustar el límite (por ejemplo, 50mb)

  const port = process.env.PORT || 3200;
  await app.listen(port);
  console.log(port);
}
bootstrap();
