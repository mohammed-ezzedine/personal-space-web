export const environment = {
    serverBaseUrl: 'http://localhost:8080',
    auth: {
        issuerUrl: 'http://localhost:8081/realms/testing',
        clientId: 'web',
        scope: 'openid',
        grantType: 'code'
    }
};
