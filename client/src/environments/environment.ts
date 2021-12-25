// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let lang = localStorage.getItem('lang') ?? 'ar';
export const environment = {
  production: false,

  apiUrl: `https://localhost:44371/api/`, //test
  // apiUrl: `https://dev.excp.sa:8018/${lang}/api/`, // developement
  // apiUrl: `https://www.eitinaa.com:8006/${lang}/api/`, // live
  // apiUrlForRenewContract: `https://dev.excp.sa:8027/${lang}/api/`,
  domain: 'https://localhost',
  signAuth: 'UGFzc05BU0FQSUBOYXNBUElVc2VyMTIzQFBhc3M6TmFzQVBJVXNlcjEyM0B1c2Vy#',
  googleMapKey: 'AIzaSyAlKMP7a65UobHAwUnPVTgZ49U-QmGaqpE',
  isPaymentTest: true,

  googleMapGetAddressByLatAndLongURL:
    'https://maps.googleapis.com/maps/api/geocode/json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
