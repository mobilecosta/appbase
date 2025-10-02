// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  api: {
    login: '/login',
    users: '/users',
    contracts: '/contracts',
  },

  SUPABASE_URL: 'https://vyaanexndrntezuqilnl.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YWFuZXhuZHJudGV6dXFpbG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTIzNTUsImV4cCI6MjA3NDcyODM1NX0.kfqf7r4u-ZKTHetvx1T6j8SF4NsRZY6FOv_GWjfiBZE',
};

  // export const environment = {
  // apiEndpointPath: 'http://localhost:3000',

  // mudar no proxy também
  // apiEndpointPath: 'https://httpbin.org', 
  // apiUri: '/basic-auth/',

  // apiEndpointPath: 'https://www.freeprojectapi.com',
  // apiUri: '/api/UserApp/login',
  // username: 'admin',
  // password: 'admin',

  // wso2TokenUrl: '',
  // clientId: '',
  // clientSecret: 'a'
// };

// Alterado para apontar para o endpoint aws do Protheus
// export const environment = {
//   production: false,
//   apiEndpointPath: 'http://protheusawsmobile.ddns.net:8080/rest',
//   username: 'SP01\\ws.devintegrador',
//   password: 'Y8#2T;Cg,sQ{',
//   wso2TokenUrl: 'https://apimqa.totvs.com.br/api-homologacao/token',
//   clientId: 'mm80FByLFJxE_csMa2dgpWoWP7Ia',
//   clientSecret: 'yPA1n_VBjXTG4Gi9aef4SQN1ByMa'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
