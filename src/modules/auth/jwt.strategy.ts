import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'fallback_secret',
    });
  }

  async validate(payload: { sub: string; role: string; phone: string }) {
    // هذا الكائن يُضاف إلى req.user في كل طلب محمي
    return {
      sub:   payload.sub,
      role:  payload.role,
      phone: payload.phone,
    };
  }
}
