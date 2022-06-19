import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
    imports: [JwtModule.register({})],
    providers: [AuthService, AuthController, ConfigService],
    exports: [AuthService],
})
export class AuthModule { }