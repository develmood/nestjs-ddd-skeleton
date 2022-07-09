import { Module } from '@nestjs/common';
import { OnboardingDomainModule } from '@nestjs-ddd-skeleton/onboarding/domain';
import {
  OnboardingInfrastructureModule,
  UserDataService,
} from '@nestjs-ddd-skeleton/onboarding/infrastructure';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, JwtStrategy } from './auth/strategies/jwt.strategy';
import { OnboardingController } from './onboarding.controller';
import { SignUpService } from './sign-up/sign-up.service';
import { SignUpListener } from './sign-up/sign-up.listener';
import {SharedServicesModule} from "@nestjs-ddd-skeleton/shared/services";
import {EmailUniqueRule} from "./sign-up/validators/email-unique.validator";

@Module({
  imports: [
    OnboardingDomainModule,
    OnboardingInfrastructureModule,
    SharedServicesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [OnboardingController],
  providers: [
    AuthService,
    EmailUniqueRule,
    JwtStrategy,
    LocalStrategy,
    SignUpListener,
    SignUpService,
    UserDataService,
  ],
})
export class OnboardingApplicationModule {}
