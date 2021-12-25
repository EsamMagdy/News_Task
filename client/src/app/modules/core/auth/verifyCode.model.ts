import { User } from 'src/app/modules/shared/models/user.model';

export class VerifyCode {
  user: User;
  token: string;
  twoFactorAuthEnabled: boolean;
}
