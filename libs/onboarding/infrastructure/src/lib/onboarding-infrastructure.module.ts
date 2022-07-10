import { Module } from '@nestjs/common';
import { OnboardingDomainModule } from '@nestjs-ddd-skeleton/onboarding-domain';
import { SharedOrmModule } from '@nestjs-ddd-skeleton/shared-entities';

@Module({
  imports: [OnboardingDomainModule, SharedOrmModule],
  exports: [SharedOrmModule],
})
export class OnboardingInfrastructureModule {}
