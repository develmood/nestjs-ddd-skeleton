import { Injectable } from '@nestjs/common';
import { OnboardingEvents, User } from '@nestjs-ddd-skeleton/onboarding-domain';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDataService } from '@nestjs-ddd-skeleton/onboarding-infrastructure';

@Injectable()
export class SignUpListener {
  constructor(private dataService: UserDataService) {}

  @OnEvent(OnboardingEvents.UserCreated)
  async sendVerificationMail(user: User, code: number) {
    return this.dataService.sendVerificationMail(user, code);
  }
}
