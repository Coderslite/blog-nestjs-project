import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local_strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from './constants';
import { JwtStrategy } from './strategy/jwt_strategy';

@Module({
  imports:[PassportModule,UsersModule,JwtModule.register({secret:jwt.secretKey,signOptions:{expiresIn:'10h'}})],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
