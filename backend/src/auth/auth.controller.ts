import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { Public } from 'src/decorator/public.decorator';
import { RefreshGuard } from './guards/refresh.guard';
import { RequestWithUser } from './types/requestWithUser.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(
    @Body() loginDto: LoginDTO,
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, req, res);
  }

  @Public()
  @Get('logout')
  logOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookieUserID = req.signedCookies['sub'];
    return this.authService.logOut(cookieUserID, res);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Get('refresh')
  refresh(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sub = req.signedCookies['sub'];
    const refreshToken = req.signedCookies['refresh-token'];
    const accessToken = req.signedCookies['access-token'];

    return this.authService.refresh(req, sub, refreshToken, accessToken, res);
  }
}
