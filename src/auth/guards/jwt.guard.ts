import {

    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        const role = this.reflector.get<string>('role', context.getHandler());
        const Authorization = request.headers.authorization;//
        if (!Authorization) throw new UnauthorizedException();

        const token = Authorization.split(' ')[1];
        const user = await this.authService.verifyToken(token, role);
        if (!user) throw new UnauthorizedException();
        request.user = user;//

        return true;
    }

}