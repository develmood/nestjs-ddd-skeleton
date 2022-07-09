export class VerificationCode {
  constructor(private readonly value: number = undefined) {
    if (!value) {
      this.value = Date.now();
    }
  }

  get(): number {
    return this.value;
  }

  equals(code: number) {
    return this.value === code;
  }
}
