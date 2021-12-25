import { LocalStorageKeys } from './localStorageKeys.model';

export class LocalStorage {
  private static ls: { [key: string]: string } = {
    stepData: LocalStorageKeys.stepData,
    indvContractReq: LocalStorageKeys.indvContractReq,
    userData: LocalStorageKeys.userData,
    stepId: LocalStorageKeys.stepId,
    registerData: LocalStorageKeys.registerData,
    loginData: LocalStorageKeys.loginData,
    resetPassword: LocalStorageKeys.phoneNumber,
    contractId: LocalStorageKeys.contractId,
    serviceType: LocalStorageKeys.serviceType,
    currentStep: LocalStorageKeys.currentStep,
  };

  static getKeyValue(key: string) {
    return this.ls[key];
  }
  static getAllKeyValues() {
    return this.ls;
  }
  static removeAllLocalStorage() {
    Object.keys(this.ls).forEach((key) => {
      localStorage.removeItem(key); // the value of the current key.
    });
  }
}
