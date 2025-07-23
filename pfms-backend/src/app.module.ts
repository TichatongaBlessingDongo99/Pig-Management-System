import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthSimpleModule } from './auth/auth-simple.module';
import { FarmsModule } from './farms/farms.module';
import { PigsModule } from './pigs/pigs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
      envFilePath: '.env' 
    }),
    // TypeORM will be enabled once PostgreSQL is set up
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: configService.get<number>('DATABASE_PORT'),
    //     username: configService.get<string>('DATABASE_USER'),
    //     password: configService.get<string>('DATABASE_PASSWORD'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: configService.get<string>('NODE_ENV') === 'development',
    //     logging: configService.get<string>('NODE_ENV') === 'development',
    //   }),
    //   inject: [ConfigService],
    // }),
    AuthSimpleModule,
    FarmsModule,
    PigsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
