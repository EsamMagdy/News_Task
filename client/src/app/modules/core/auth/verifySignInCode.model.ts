import { User } from '../../shared/models/user.model';

export class VerifySignInCode {
  user: User;
  token: string;
  twoFactorAuthEnabled: boolean;
}
