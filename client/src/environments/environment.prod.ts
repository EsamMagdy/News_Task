let lang = localStorage.getItem('lang') ?? 'ar';
export const environment = {
  production: true,
  apiUrl: `https://localhost:44371/api/`, //test
  // apiUrl: `https://dev.excp.sa:8018/${lang}/api/`, // developement
  // apiUrl: `https://www.eitinaa.com:8006/${lang}/api/`, // live
  domain: 'https://localhost',
  // apiUrl:`https://rao.sa:8018/${lang}/api/`,
  // apiUrlForRenewContract: `https://dev.excp.sa:8027/${lang}/api/`,
  isPaymentTest: true,
  signAuth: 'UGFzc05BU0FQSUBOYXNBUElVc2VyMTIzQFBhc3M6TmFzQVBJVXNlcjEyM0B1c2Vy#',
  googleMapKey: 'AIzaSyAlKMP7a65UobHAwUnPVTgZ49U-QmGaqpE',
  googleMapGetAddressByLatAndLongURL:
    'https://maps.googleapis.com/maps/api/geocode/json',
};
