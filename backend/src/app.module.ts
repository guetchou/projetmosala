import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { FormationsModule } from './formations/formations.module';
import { CandidaturesModule } from './candidatures/candidatures.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '172.18.0.2',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'mosala',
      entities: [User],
      synchronize: true, // à désactiver en production
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    JobsModule,
    FormationsModule,
    CandidaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
