import { Injectable } from '@nestjs/common';
import { UserDataService } from '@nestjs-ddd-skeleton/onboarding-infrastructure';
import { SignUpRequest } from './sign-up.request';
import {
  OnboardingEvents,
  Password,
  User,
  VerificationCode,
} from '@nestjs-ddd-skeleton/onboarding-domain';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SignUpService {
  constructor(
    private dataService: UserDataService,
    private eventEmitter: EventEmitter2
  ) {}

  async createUser(request: SignUpRequest): Promise<User> {
    const password = new Password(request.password);
    const verificationCode = new VerificationCode();
    const user: User = await this.dataService.createOne({
      ...request,
      password: password.hashed(),
      verificationCode: verificationCode.get(),
    });

    this.eventEmitter.emit(OnboardingEvents.UserCreated, user);

    return user;
  }

  async verifyEmail(verificationCode: number): Promise<boolean> {
    const user = await this.dataService.findByVerificationCode(
      verificationCode
    );

    if (!user) {
      return false;
    }

    user.emailVerifiedAt = new Date();
    await this.dataService.updateOne(user);
    return true;
  }
}
