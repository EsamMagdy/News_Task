import { LocalStorageService } from './localStorage.service';
import { StepResponse } from './../../shared/models/step-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {
  KeyValuePairs,
  StringKeyValuePairs,
} from '../../individual/_models/keyValuePairs.model';
import { Contact } from '../../shared/models/contact.model';
import { ResponseModel } from '../../shared/models/responseModel.model';
import { PackagePropertyType } from '../../shared/models/packagePropertyType.model';
import { HttpRequestSignature } from '../../shared/models/httpRequest-paremeter.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
  packageProperties: { [key: string]: any };
  pricingValidations: any = {
    activationAmount: (item: any): boolean => {
      return (
        item['activationAmount'] &&
        item['activationAmount'] < item['contractAmount']
      );
    },
    activatioAmountAfterVat: (item: any): boolean => {
      return (
        item['activationAmount'] &&
        item['activationAmount'] < item['contractAmount']
      );
    },
    vatAmountOfActivation: (item: any): boolean => {
      return (
        item['activationAmount'] &&
        item['activationAmount'] < item['contractAmount']
      );
    },
    advancedAmount: (item: any): boolean => {
      return item['advancedAmount'];
    },
    advancedAmountAfterVat: (item: any): boolean => {
      return item['advancedAmount'];
    },
    packageName: (item: any): boolean => {
      return item['packageName'];
    },

    discount: (item: any): boolean => {
      return item['discount'];
    },
    packagePriceAfterDiscount: (item: any): boolean => {
      return item['discount'];
    },
    prePaid: (item: any): boolean => {
      return item['prePaid'];
    },
    monthlyPaidAmount: (item: any): boolean => {
      return item['prePaid'];
    },
    amountInsurance: (item: any): boolean => {
      return item['amountInsurance'];
    },
    packageDisplayName: (item: any): boolean => {
      return item['packageDisplayName'];
    },
    professionGroupName: (item: any): boolean => {
      return item['professionGroupName'];
    },
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  getActiveCities() {
    return this.http
      .get<ResponseModel<StringKeyValuePairs[]>>(
        environment.apiUrl + `City/ActiveCities`
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
  getCityDistricts(cityId: string) {
    return this.http
      .get<ResponseModel<StringKeyValuePairs[]>>(
        environment.apiUrl + `City/CityDistricts?cityId=${cityId}`
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
  getContactGender() {
    return this.http
      .get<ResponseModel<KeyValuePairs[]>>(
        environment.apiUrl + `Contact/ContactGender`
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
  getActiveNationalities() {
    return this.http
      .get<ResponseModel<StringKeyValuePairs[]>>(
        environment.apiUrl + `Nationality/ActiveNationalities`
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
  CompleteProfile(contact: any) {
    let stepId = this.localStorageService.stepIdLocalStorage;
    let serviceType = this.localStorageService.ServiceType;
    let contactId = this.localStorageService.userLocalStorage.crmUserId;
    contact['contactId'] = contactId;

    return this.http
      .post<ResponseModel<StepResponse>>(
        environment.apiUrl +
          `Contact/CompleteProfile?serviceType=${serviceType}&stepId=${stepId}&stepType=1`,
        contact
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
  createContract() {
    let stepId = this.localStorageService.stepIdLocalStorage;
    let serviceType = this.localStorageService.ServiceType;
    let contactId = this.localStorageService.userLocalStorage.crmUserId;

    return this.http
      .get<ResponseModel<StepResponse>>(
        environment.apiUrl +
          `IndividualContractRequest/CreateContract?stepId=${stepId}&contactId=${contactId}`
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
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
  checkValidation(item: any, properName: any): boolean {
    let s =
      !this.pricingValidations[properName] ||
      this.pricingValidations[properName](item);
    return s;
  }
  isNumber(val: any): boolean {
    return typeof val === 'number';
  }
  // isCurrency(pricingProp: string) {
  //   return this.packageProperties[pricingProp]['type'] == 'currency';
  // }
  isCurrency(pricingProp: string, selectedPricing: any = null) {
    if (pricingProp && selectedPricing) {
      return (
        selectedPricing['type'] ==
        PackagePropertyType[PackagePropertyType.currency]
      );
    }
    return false;
  }
  // isPercent(pricingProp: string) {
  //   return this.packageProperties[pricingProp]['type'] == 'percent';
  // }
  isPercent(pricingProp: string, selectedPricing: any = null) {
    if (pricingProp && selectedPricing) {
      return (
        selectedPricing['type'] ==
        PackagePropertyType[PackagePropertyType.percent]
      );
    }
    return false;
  }
  excuteHttpRequestWithoutBody<T>(
    httpMethod: string,
    params: {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    },
    httpRequestParemeter: HttpRequestSignature
  ) {
    let url =
      httpRequestParemeter.stepDetails != null
        ? environment.apiUrl +
          httpRequestParemeter.stepDetails.controller +
          '/' +
          httpRequestParemeter.stepDetails.action
        : environment.apiUrl +
          httpRequestParemeter.controller +
          `/` +
          httpRequestParemeter.action;
    return this.http
      .request<ResponseModel<T>>(httpMethod, url, {
        params: params,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
