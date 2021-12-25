import { Injectable } from "@angular/core";
import { IndividualPricingSaved } from "../../individual/components/individual-packages/individual-pricing-saved.model";
import { IndividualContractReq } from "../../individual/_models/individualContractReq.model";
import { IndividualContractReqLocalStorage } from "../../individual/_models/individualContractReqLocalStorage.model";
import { IndivReqLocalStorageKeys } from "../../individual/_models/indivReqLocalStorageKeys.model";
import { Package } from "../../individual/_models/package.model";
import { LocalStorageKeys } from "../../shared/models/localStorageKeys.model";
import { StepData } from "../../shared/models/stepData.model";
import { User } from "../../shared/models/user.model";
import { ServiceType } from "../../shared/_enums/serviceType";
import { Login } from "../auth/login.model";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get indivContractReqLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.indvContractReq));
  }
  set indivContractReqLocalStorage(
    indivContractReq: IndividualContractReqLocalStorage
  ) {
    localStorage.setItem(
      LocalStorageKeys.indvContractReq,
      JSON.stringify(indivContractReq)
    );
  }
  get indivContractCreatedLocalStorage() {
    return JSON.parse(
      localStorage.getItem(LocalStorageKeys.indvContractCreated)
    );
  }
  set indivContractCreatedLocalStorage(
    indivContractCreated: IndividualContractReq
  ) {
    localStorage.setItem(
      LocalStorageKeys.indvContractCreated,
      JSON.stringify(indivContractCreated)
    );
  }
  get languageLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.language);
  }
  get userLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.userData));
  }
  get registrationDataLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.registerData));
  }
  set registrationDataLocalStorage(user: User) {
    localStorage.setItem(LocalStorageKeys.registerData, JSON.stringify(user));
  }
  get loginDataLocalStorage() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.loginData));
  }
  set loginDataLocalStorage(user: Login) {
    localStorage.setItem(LocalStorageKeys.loginData, JSON.stringify(user));
  }
  get stepIdLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.stepId);
  }
  set contractIdLocalStorage(contractId: string) {
    localStorage.setItem(LocalStorageKeys.contractId, contractId);
  }
  get contractIdLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.contractId);
  }
  set stepIdLocalStorage(stepId: string) {
    localStorage.setItem(LocalStorageKeys.stepId, stepId);
  }
  get phoneNumberLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.phoneNumber);
  }
  set phoneNumberLocalStorage(phoneNumber: string) {
    localStorage.setItem(LocalStorageKeys.phoneNumber, phoneNumber);
  }
  get StepData() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.stepData));
  }
  set StepData(stepData: StepData) {
    localStorage.setItem(LocalStorageKeys.stepData, JSON.stringify(stepData));
  }
  get ServiceType() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.serviceType));
  }
  set ServiceType(serviceType: ServiceType) {
    localStorage.setItem(
      LocalStorageKeys.serviceType,
      JSON.stringify(serviceType)
    );
  }

  set CurrentStep(step: string) {
    localStorage.setItem(LocalStorageKeys.currentStep, step);
  }

  get CurrentStep() {
    return localStorage.getItem(LocalStorageKeys.currentStep);
  }
  setIndividualPricingInLocalStorageData(
    individualPricing: IndividualPricingSaved
  ) {
    let indivContractReqLocalStorage = this.indivContractReqLocalStorage;
    indivContractReqLocalStorage.individualPricing = { ...individualPricing };
    this.indivContractReqLocalStorage = indivContractReqLocalStorage;
  }
  // setEmployeeIdInLocalStorageData(selectedEmployeeId: string) {
  //   let indivContractReqLocalStorage = this.indivContractReqLocalStorage;
  //   indivContractReqLocalStorage.employee = {
  //     selectEmployeeId: selectedEmployeeId,
  //   };
  //   this.indivContractReqLocalStorage = indivContractReqLocalStorage;
  // }
  setContractTemplatePolicy() {
    let indivContractReqLocalStorage = this.indivContractReqLocalStorage;
    indivContractReqLocalStorage.contractTepmlate = {
      agreePolicy: true,
    };
    this.indivContractReqLocalStorage = indivContractReqLocalStorage;
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
  removeLocalStorageExceptContractTemplateKey() {
    let indivReq: any = this.indivContractReqLocalStorage;
    if (!indivReq) return;
    Object.keys(indivReq).forEach((key) => {
      if (key != IndivReqLocalStorageKeys.ContractTepmlate) {
        delete indivReq[key];
      }
    });

    this.indivContractReqLocalStorage = indivReq;
  }
  removeLocalStorageWithKeyAndValue(
    parentKey: string,
    childKey: string,
    value: string
  ) {
    let localStorageParentKey: any = JSON.parse(
      localStorage.getItem(parentKey)
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
  setStepDataFromDb(data: StepData) {
    this.setAddAddressFromDB(data);
    this.setIndividualPricingFromDb(data);
    this.setEmployeeFromDb(data);
  }

  setAddAddressFromDB(data: StepData) {
    let addressSaved = data.contactLocationVm;

    if (!addressSaved) return;
    // var indivContractReqLocalStorage = this.indivContractReqLocalStorage;
    // indivContractReqLocalStorage.address = {
    //   type: addressSaved.type,
    //   apartmentNo: addressSaved.apartmentNo,
    //   cityId: addressSaved.cityId,
    //   districtId: addressSaved.districtId,
    //   floorNo: +addressSaved.floorNo,
    //   houseNo: addressSaved.houseNo,
    //   houseType: addressSaved.houseType,
    //   latitude: addressSaved.latitude,
    //   longitude: addressSaved.longitude,
    //   savedLocationId: data.selectedLocationId,
    // };
    // this.indivContractReqLocalStorage = indivContractReqLocalStorage;

    /** */
    // let indivContractReq = new IndividualContractReqLocalStorage();
    // indivContractReq.address = { ...addressSaved };
    // this.indivContractReqLocalStorage = indivContractReq;
  }
  setIndividualPricingFromDb(data: StepData) {
    let individualPricing: Package = data.individualPricing;

    if (!individualPricing) return;
    let indivContractReq = this.indivContractReqLocalStorage;
    indivContractReq.individualPricing = {
      employeePickSource: data.employeePickSource,
      houseBuildingId: data.houseBuildingId,
      howToRecieveWorker: data.howtoReceiveWorker,
      nationalityId: individualPricing.resourceGroupId,
      pricingId: individualPricing.id,
      professionId: individualPricing.professionGroupId,
      deliveryCost: +data.deliveryCost,
    };
    this.indivContractReqLocalStorage = indivContractReq;
    // this.indivContractReqLocalStorage.individualPricing.pricingId =
    //   individualPricing.id;
    // this.indivContractReqLocalStorage.individualPricing.professionId =
    //   data.professionGroupId;
    // this.indivContractReqLocalStorage.individualPricing.howToRecieveWorker =
    //   data.howtoReceiveWorker;
    // this.indivContractReqLocalStorage.individualPricing.houseBuildingId =
    //   data.houseBuildingId;
    // this.indivContractReqLocalStorage.individualPricing.employeePickSource =
    //   data.employeePickSource;
    // let indivContractReq: any = this.indivContractReqLocalStorage;
    // indivContractReq.individualPricing = new IndividualPricingSaved();
    // this.intersection(individualPricing, indivContractReq.individualPricing);
    // indivContractReq.individualPricing = { ...individualPricing };
    // Object.keys(indivContractReq).map(function (key, index) {
    //   indivContractReq.individualPricing[key] = individualPricing[key];
    // });
    // this.indivContractReqLocalStorage = indivContractReq;
  }
  setEmployeeFromDb(data: StepData) {
    // let employeeIdSaved = data.employeeId;

    // if (!employeeIdSaved) return;

    // let indivContractReq = this.indivContractReqLocalStorage;
    // indivContractReq.employee = { selectEmployeeId: employeeIdSaved };
    // this.indivContractReqLocalStorage = indivContractReq;
    // return this.indivContractReqLocalStorage &&
    //   this.indivContractReqLocalStorage.hasOwnProperty('employee')
    //   ? (this.indivContractReqLocalStorage.employee.selectEmployeeId =
    //       data.employeeId)
    //   : null;
  }
  intersection(o1: any, o2: any) {
    return Object.keys(o1).filter({}.hasOwnProperty.bind(o2));
  }
}
