import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JWT_SECRET } from '@/constants';

@Module({
  imports: [
    UsersModule, // Asegúrate de que UsersModule esté importado aquí
    JwtModule.register({
      secret: JWT_SECRET, // Cambia esto a una clave secreta segura
      signOptions: { expiresIn: '1h' }, // Cambia esto según tus requisitos
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
