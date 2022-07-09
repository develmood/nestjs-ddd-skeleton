import { Module } from '@nestjs/common';
import { OnboardingDomainModule } from '@nestjs-ddd-skeleton/onboarding/domain';
import { SharedOrmModule } from '@nestjs-ddd-skeleton/shared/orm';

@Module({
  imports: [OnboardingDomainModule, SharedOrmModule],
  exports: [SharedOrmModule],
})
export class OnboardingInfrastructureModule {}
