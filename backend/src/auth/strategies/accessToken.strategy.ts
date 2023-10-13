import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginResponse } from '../types/LoginResponse.type';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import * as agron2 from 'argon2';

export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.signedCookies['access-token'],
      ]),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: LoginResponse): Promise<LoginResponse> {
    const subCookie = req.signedCookies['sub'];
    const payloadSub = payload.sub;

    if (subCookie !== payloadSub || !subCookie || !payloadSub)
      throw new UnauthorizedException('Unauthorized');

    const findUser = await this.authModel.findById(payloadSub);

    if (!findUser) throw new UnauthorizedException('Unauthorized');

    try {
      await agron2.verify(
        findUser.refreshToken,
        req.signedCookies['refresh-token'],
      );
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }

    req.user = payload;

    return payload;
  }
}
