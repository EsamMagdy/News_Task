export class User {
    constructor(
      public id?: string,
      public crmUserId?: string,
      public name?: string,
      public userName?: string,
      public phoneNumber?: string,
      public code?: string,
      public email?: string,
      public password?: string,
      public confirmPassword?: string,
      public address?: string,
      public _token?: string,
      public _tokenExpirationDate?: Date,
      public expiresIn?: number,
      public _tokenType?: string,
      public rememberMe?: boolean,
      public phoneNumberConfirmed?: boolean
    ) { }
  
    setTokenData(code: string) {
      let token: any = JSON.parse(code.replace(/\\|\//g, ''));
      this._token = token['access_token'];
      this.expiresIn = 2147483647;
      this._tokenExpirationDate = new Date(
        new Date().getTime() + 2147483647
      );
      // this.expiresIn = +token['expires_in'];
      // this._tokenExpirationDate = new Date(
      //   new Date().getTime() + this.expiresIn * 1000
      // );
      this._tokenType = token['token_type'];
    }
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
  }