import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import {SignUpRequest} from "./sign-up/sign-up.request";
import {JwtAuthGuard, LocalAuthGuard} from "@nestjs-ddd-skeleton/shared/guards";
import {SignInResponse} from "./sign-in/sign-in.response";
import {AuthService} from "./auth/auth.service";
import {SignUpService} from "./sign-up/sign-up.service";
import {JsonResponse, successResponse} from "@nestjs-ddd-skeleton/shared/mappers";

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private authService: AuthService,
    private signUpService: SignUpService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() request: SignUpRequest): Promise<JsonResponse<SignInResponse>> {
    await this.signUpService.createUser(request);
    return successResponse();
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() { user }): Promise<JsonResponse<SignInResponse>> {
    const response = await this.authService.login(user);
    return successResponse(response);
  }

  @Get('verify-email/:code')
  async verifyEmail(@Param('code') code: number) {
    return this.signUpService.verifyEmail(code);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  tokenGuardedRoute() {
    return 'test'
  }
}
