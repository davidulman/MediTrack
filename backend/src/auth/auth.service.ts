import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RequestWithUser } from './types/requestWithUser.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly aTokenCookieMaxAge = 1000 * 60 * 30;
  private readonly rTokenCookieMaxAge = 1000 * 60 * 60 * 24 * 30;

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const lowerCaseEmail = email.toLowerCase();

    try {
      const checkForExUser = await this.authModel.findOne({
        email: lowerCaseEmail,
      });
      if (checkForExUser)
        throw new ConflictException('Email already exists, please login!');
    } catch (error) {
      throw new BadRequestException('Error While Creating User');
    }

    const hashedPassword = await this.salting(password);

    try {
      const newUser = await this.authModel.create({
        ...registerDto,
        email: lowerCaseEmail,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new BadRequestException('Error While Creating User');
    }
  }

  async login(loginDto: LoginDTO, req: RequestWithUser, res: Response) {
    const { email, password } = loginDto;
    const lowerCaseEmail = email.toLowerCase();

    const findUser = await this.authModel.findOne({ email: lowerCaseEmail });
    if (!findUser) throw new UnauthorizedException('Invalid Credentials');

    const checkSalting = await this.checkSalting(password, findUser.password);
    if (!checkSalting) throw new UnauthorizedException('Invalid Credentials');

    const { accessToken, refreshToken } = this.generateJWTTokens(
      findUser._id,
      lowerCaseEmail,
    );

    const hashedRefreshToken = await this.salting(refreshToken);

    try {
      await findUser.updateOne({ refreshToken: hashedRefreshToken });
    } catch (error) {
      throw new BadRequestException('Error Login');
    }

    this.setCookies('access-token', accessToken, this.aTokenCookieMaxAge, res);
    this.setCookies(
      'refresh-token',
      refreshToken,
      this.rTokenCookieMaxAge,
      res,
    );
    this.setCookies('sub', findUser._id, this.rTokenCookieMaxAge, res);

    const userData = {
      sub: findUser._id,
      email: findUser.email,
    };

    req.user = userData;

    return {
      ...userData,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      accessToken,
      refreshToken,
    };
  }

  async logOut(sub: string, res: Response) {
    await this.authModel.findByIdAndUpdate(sub, {
      refreshToken: null,
    });
    this.clearCookies(res);
    return {
      message: 'Logout Success',
    };
  }

  async refresh(
    req: RequestWithUser,
    sub: string,
    refreshToken: string,
    accessToken: string,
    res: Response,
  ) {
    const verifiedSub = req.user.sub;

    if (!sub || !refreshToken || !accessToken)
      throw new UnauthorizedException('Invalid Credentials!');

    if (verifiedSub !== sub.toString()) {
      await this.logOut(sub, res);
      throw new UnauthorizedException('Invalid Credentials!!');
    }

    const findUser = await this.authModel.findById(verifiedSub);
    if (!findUser) throw new UnauthorizedException('Invalid Credentials');

    const verifyRefreshToken = await this.checkSalting(
      refreshToken,
      findUser.refreshToken,
    );
    if (!verifyRefreshToken)
      throw new UnauthorizedException('Invalid Credentials');

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      this.generateJWTTokens(findUser._id, findUser.email);

    const hashedRefreshToken = await this.salting(newRefreshToken);

    try {
      await findUser.updateOne({ refreshToken: hashedRefreshToken });
    } catch (error) {
      throw new BadRequestException('Error While Refreshing');
    }

    this.setCookies(
      'access-token',
      newAccessToken,
      this.aTokenCookieMaxAge,
      res,
    );
    this.setCookies(
      'refresh-token',
      newRefreshToken,
      this.rTokenCookieMaxAge,
      res,
    );
    this.setCookies('sub', findUser._id, this.rTokenCookieMaxAge, res);

    return {
      ...req.user,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  generateJWTTokens(userID: string, email: string) {
    try {
      const accessToken = this.jwtService.sign(
        { sub: userID, email },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        },
      );

      const refreshToken = this.jwtService.sign(
        { sub: userID, email },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new BadRequestException('Error generating tokens.');
    }
  }

  setCookies(
    cookieName: string,
    cookiePayload: string,
    cookieMaxAge: number,
    res: Response,
  ) {
    res.cookie(cookieName, cookiePayload, {
      maxAge: cookieMaxAge,
      secure: true,
      httpOnly: true,
      sameSite: true,
      signed: true,
    });
  }

  clearCookies(res: Response) {
    try {
      res.clearCookie('access-token');
      res.clearCookie('refresh-token');
      res.clearCookie('sub');
    } catch (error) {
      throw new BadRequestException('Error clearing the cookies.');
    }
  }

  salting(password: string) {
    try {
      return argon2.hash(password);
    } catch (error) {
      throw new BadRequestException('Error hashing the password.');
    }
  }

  async checkSalting(password: string, hashedPassword: string) {
    try {
      return await argon2.verify(hashedPassword, password);
    } catch (error) {
      throw new BadRequestException('Error verifying the password.');
    }
  }
}
