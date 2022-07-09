import {Injectable} from "@nestjs/common";
import {UserEntity} from "@nestjs-ddd-skeleton/shared/orm";
import {Repository} from "typeorm";
import {CreateUser, User, UserRepositoryContract} from "@nestjs-ddd-skeleton/onboarding/domain";
import {InjectRepository} from "@nestjs/typeorm";
import {MailService} from "@nestjs-ddd-skeleton/shared/services";

@Injectable()
export class UserDataService implements UserRepositoryContract {

  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private readonly mailService: MailService,
  ) {}

  async createOne(payload: CreateUser): Promise<User> {
    return this.repository.save({
      ...(new UserEntity),
      ...payload,
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOneBy( { email } );
  }

  async findByVerificationCode(verificationCode: number): Promise<User> {
    return this.repository.findOneBy({ verificationCode, emailVerifiedAt: null });
  }

  async updateOne(user: Partial<UserEntity>) {
    return this.repository.save(user);
  }

  async sendVerificationMail(user: User, code: number) {
    return this.mailService.send({
      to: user.email,
      subject: 'Confirm your Email Address',
      template: './sign-up',
      context: {
        link: 'http://localhost:3333/api/onboarding/verify-email',
        code,
      },
    });
  }
}
