import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthSimpleModule } from './auth/auth-simple.module';
import { FarmsModule } from './farms/farms.module';
import { PigsModule } from './pigs/pigs.module';
import { BatchModule } from './batch/batch.module';
import { PenModule } from './pens/pen.module';
import { HealthModule } from './health/health.module';
import { FeedingModule } from './feeding/feeding.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
      envFilePath: '.env' 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isPostgres = configService.get<string>('DATABASE_TYPE', 'sqlite') === 'postgres';
        
        if (isPostgres) {
          return {
            type: 'postgres',
            host: configService.get<string>('DATABASE_HOST', 'localhost'),
            port: configService.get<number>('DATABASE_PORT', 5432),
            username: configService.get<string>('DATABASE_USER', 'postgres'),
            password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
            database: configService.get<string>('DATABASE_NAME', 'pfms_db'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: configService.get<string>('NODE_ENV') === 'development',
            logging: configService.get<string>('NODE_ENV') === 'development',
          };
        } else {
          // SQLite fallback for development
          return {
            type: 'better-sqlite3',
            database: configService.get<string>('DATABASE_PATH', './pfms_dev.db'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: configService.get<string>('NODE_ENV') === 'development',
          };
        }
      },
      inject: [ConfigService],
    }),
    AuthSimpleModule,
    FarmsModule,
    PigsModule,
    BatchModule,
    PenModule,
    HealthModule,
    FeedingModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
