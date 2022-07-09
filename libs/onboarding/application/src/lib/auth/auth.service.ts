import {Injectable} from "@nestjs/common";
import {UserDataService} from "@nestjs-ddd-skeleton/onboarding/infrastructure";
import {JwtService} from "@nestjs/jwt";
import {SignInResponse} from "../sign-in/sign-in.response";
import {Password, User} from "@nestjs-ddd-skeleton/onboarding/domain";

@Injectable()
export class AuthService {
  constructor(
    private userDataService: UserDataService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.userDataService.findByEmail(email);
    const pass = new Password(password);

    if (user && pass.equals(user.password)) {
      return user;
    }

    return undefined;
  }

  async login(user: User): Promise<SignInResponse> {
    const payload = { email: user.email, sub: user.id}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result} = user;
    return {
      ...result,
      jwt: this.jwtService.sign(payload),
    }
  }
}
