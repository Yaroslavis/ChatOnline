import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'supersecret', // ⚠️ вынеси в .env позже
    });
  }

  async validate(payload: any) {
    // ⚠️ Тут мы приводим payload к единому виду
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
