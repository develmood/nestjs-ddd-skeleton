import * as bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

export class Password {
  constructor(private readonly value: string) {}

  hashed(): string {
    return bcrypt.hashSync(this.value, salt);
  }

  equals(hash: string): boolean {
    return bcrypt.compareSync(this.value, hash);
  }
}
