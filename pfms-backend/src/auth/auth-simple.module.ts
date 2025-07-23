import { Module } from '@nestjs/common';
import { AuthServiceSimple } from './auth-simple.service';
import { AuthSimpleController } from './auth-simple.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthSimpleController],
  providers: [AuthServiceSimple, JwtStrategy],
  exports: [JwtStrategy, PassportModule, AuthServiceSimple],
})
export class AuthSimpleModule {}
