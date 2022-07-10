import { IsEmail, IsNotEmpty } from 'class-validator';
import { isUniqueEmail } from './validators/email-unique.validator';
import { OnboardingExceptionMessage } from '../onboarding-exception.message';

export class SignUpRequest {
  @IsEmail(undefined, { message: OnboardingExceptionMessage.EmailFormat })
  @isUniqueEmail(undefined, { message: OnboardingExceptionMessage.EmailExists })
  email: string;

  @IsNotEmpty()
  password: string;
}
