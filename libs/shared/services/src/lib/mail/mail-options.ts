export interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context?: {
    [name: string]: any;
  };
}
