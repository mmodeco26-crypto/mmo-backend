import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ تفعيل ترويسات الأمان Helmet (مع استثناء الـ CSP لـ Swagger)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // تفعيل التحقق التلقائي من الـ DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // تجاهل الحقول غير المعرّفة في الـ DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Response Wrapper
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global Exception Handler
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  // 📄 Swagger (OpenAPI) Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('🏍️ Moto Delivery Platform API')
    .setDescription(
      'منصة توصيل الدراجات النارية الذكية — توثيق كامل لجميع نقاط الاتصال، نظام التسعير، معالجة Concurrency، والبحث الجغرافي PostGIS.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'أدخل رمز JWT token هنا (بدون كلمة Bearer)',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'عمليات تسجيل الحسابات وتسجيل الدخول')
    .addTag('Authentication - OTP', 'إرسال والتحقق من كود الـ SMS OTP')
    .addTag('Drivers', 'إدارة السائقين، تحديث الموقع الجغرافي، وحالة الاتصال')
    .addTag('Orders', 'إدارة الطلبات، جلب الطلبات القريبة، قبول الطلب، وتحديث الحالات')
    .addTag('Wallet', 'إدارة المحافظ المالية، الخصومات التلقائية، وسجل المعاملات')
    .addTag('Reviews', 'نظام التقييم والمراجعات بعد اكتمال التوصيل')
    .addTag('Admin', 'لوحة تحكم الإدارة، الإحصائيات الحية، وتوثيق السائقين KYC')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Moto Delivery API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🏍️  Moto Delivery API running on: http://localhost:${port}/api/v1`);
  console.log(`📑  Swagger Docs available at:  http://localhost:${port}/api/docs`);
}
bootstrap();
