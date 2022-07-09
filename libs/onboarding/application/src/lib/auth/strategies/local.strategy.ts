import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../auth.service";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {User} from "@nestjs-ddd-skeleton/onboarding/domain";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('onboarding_unauthorized');
    }

    return user;
  }
}
