import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserDataService } from '@nestjs-ddd-skeleton/onboarding-infrastructure';
import { Injectable } from '@nestjs/common';

export const isUniqueEmail =
  (options?: unknown, validationOptions?: ValidationOptions) =>
  (object: unknown, propertyName: string): void => {
    registerDecorator({
      name: 'isUniqueEmail',
      target: object.constructor,
      propertyName,
      validator: EmailUniqueRule,
      options: {
        message: validationOptions?.message,
      },
    });
  };

@ValidatorConstraint()
@Injectable()
export class EmailUniqueRule implements ValidatorConstraintInterface {
  constructor(private dataService: UserDataService) {}

  defaultMessage(): string {
    return 'email_exists';
  }

  async validate(value: string): Promise<boolean> {
    const user = await this.dataService.findByEmail(value);

    return !user;
  }
}
