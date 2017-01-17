// Here configured dependency to running backend services

export const environment = {
  production: true,
  baseUrl: 'http://apiconnect-e5c7e9eb-aacd-4e75-aa19-20e4e75caab7.nikki-consulting-dev.apic.mybluemix.net/api',
  baseTag: 'Notes',
  clientIdHeader: 'x-ibm-client-id',
  clientIdDefault: 'default',
  clientSecretHeader: 'x-ibm-client-secret',
  clientSecretDefault: 'SECRET'
};
