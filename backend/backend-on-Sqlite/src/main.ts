import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('API task')
    .setDescription('descricoes da API task')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
  origin: 'http://localhost:4000', // Permite apenas este domínio
  methods: 'GET,POST,PUT,DELETE', // Permite apenas esses métodos HTTP
  allowedHeaders: 'Content-Type, Authorization', // Permite apenas esses cabeçalhos
  credentials: true, // Permite envio de cookies
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
