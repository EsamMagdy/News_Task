import { User } from '../../shared/models/user.model';

export class Login {
  user: User;
  token: string;
  twoFactorAuthEnabled: boolean;
  password:string;
}
