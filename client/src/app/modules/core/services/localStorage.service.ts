import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../../shared/models/localStorageKeys';
import { User } from '../../shared/models/user.model';
import { ServiceType } from '../../shared/_enums/serviceType';
import { Login } from '../auth/login.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
 
 
  get languageLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.language);
  }
  get userLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.userData)!);
  }
  get registrationDataLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.registerData)!);
  }
  set registrationDataLocalStorage(user: User) {
    localStorage.setItem(LocalStorageKeys.registerData, JSON.stringify(user));
  }
  get loginDataLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.loginData)!);
  }
  set loginDataLocalStorage(user: Login) {
    localStorage.setItem(LocalStorageKeys.loginData, JSON.stringify(user));
  }
  get stepIdLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.stepId)!;
  }

  set contractIdLocalStorage(contractId: string) {
    localStorage.setItem(LocalStorageKeys.contractId, contractId);
  }
  get contractIdLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.contractId)!;
  }
  set stepIdLocalStorage(stepId: string) {
    localStorage.setItem(LocalStorageKeys.stepId, stepId);
  }
  get phoneNumberLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.phoneNumber)!;
  }
  set phoneNumberLocalStorage(phoneNumber: string) {
    localStorage.setItem(LocalStorageKeys.phoneNumber, phoneNumber);
  }
 
  get ServiceType() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.serviceType)!);
  }
  set ServiceType(serviceType: ServiceType) {
    localStorage.setItem(
      LocalStorageKeys.serviceType,
      JSON.stringify(serviceType)
    );
  }

  
 
  
  getLocalStorageParentKey(obj: any) {
    let indReq: { [key: string]: any } = obj;
    if (indReq) return indReq;
    return null;
  }
  getLocalStoragePropertyKey(obj: any, key: string) {
    let indReq: { [key: string]: any } = obj;
    if (indReq && indReq.hasOwnProperty(key)) return indReq[key];
    return null;
  }
  getLocalStoragePropertyValue(obj: any, key: string, value: string) {
    let indReq: { [key: string]: any } = obj;
    if (indReq && indReq.hasOwnProperty(key)) return indReq[key][value];
    return null;
  }
  removeLocalStorageWithKey(key: string) {
    localStorage.removeItem(key); // the value of the current key.
  }
 
  removeLocalStorageWithKeyAndValue(
    parentKey: string,
    childKey: string,
    value: string
  ) {
    let localStorageParentKey: any = JSON.parse(
      localStorage.getItem(parentKey)!
    );
    // let indivReq: any = this.indivContractReqLocalStorage;
    if (!localStorageParentKey) return;

    let localStorageChildKey: any = localStorageParentKey[childKey];

    if (!localStorageChildKey) return;

    Object.keys(localStorageChildKey).forEach((element) => {
      if (element == value) {
        delete localStorageChildKey[element];
      }
    });

    localStorageParentKey[childKey] = localStorageChildKey;
    localStorage.setItem(
      LocalStorageKeys.indvContractReq,
      JSON.stringify(localStorageParentKey)
    );
  }
  
 
  
  
  intersection(o1: any, o2: any) {
    return Object.keys(o1).filter({}.hasOwnProperty.bind(o2));
  }
}
