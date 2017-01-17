// Here configured dependency to running backend services

// NOTE: due to bug in CLI additional files aren't used

// Proprietary bluemix (DEA)
//apiconnect-e5c7e9eb-aacd-4e75-aa19-20e4e75caab7.nikki-consulting-dev.apic.mybluemix.net 

// cloud foundry (Diego)
// apiconnect-e5c7e9eb-aacd-4e75-aa19-20e4e75caab7.nikki-consulting-dev.apic.mybluemix.net 

export const environment = {
  production: true,
  baseUrl: 'https://127.0.0.1:4002/api',
  baseTag: 'Notes',
  clientIdHeader: 'x-ibm-client-id',
  clientIdDefault: 'default',
  clientSecretHeader: 'x-ibm-client-secret',
  clientSecretDefault: 'SECRET'
};
