import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { jwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  secretKey = {
    USER: this.configService.get('USER_SECRET_KEY'),
  };
  async createToken(payload: any, role: string): Promise<string> {
    if (!payload) throw new Error('No payload provided');
    if (!role) throw new Error('No role provided');

    const jwtPayload: jwtPayload = {
      payload,
      role,
    };

    const key = this.secretKey[role];
    if (!key) throw new Error('No secret key provided');

    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: key,
      expiresIn: '1h',
    });

    return token;
  }

  async verifyToken(token: string, role: string): Promise<any> {
    if (!role) return null;

    const key = this.secretKey[role];
    if (!key) return null;

    try {
      return await this.jwtService.verify(token, { secret: key });
    } catch (error) {
      return null;
    }
  }
}
