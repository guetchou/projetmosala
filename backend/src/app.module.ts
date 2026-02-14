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
import { AdminUsersModule } from './admin-users/admin-users.module';
import { NewsModule } from './news/news.module';
import { FormationsAdvancedModule } from './formations-advanced/formations-advanced.module';
import { News } from './news/entities/news.entity';
import { FormationAdvanced } from './formations-advanced/entities/formation-advanced.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [User, News, FormationAdvanced],
      synchronize: true,
      autoLoadEntities: true,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    UsersModule,
    AuthModule,
    JobsModule,
    FormationsModule,
    CandidaturesModule,
    AdminUsersModule,
    NewsModule,
    FormationsAdvancedModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
