export const environment = {
    serverBaseUrl: '/experimental/api',
    auth: {
        issuerUrl: 'http://auth-server:8080/realms/personal-space',
        clientId: 'personal-space-web',
        scope: 'openid',
        grantType: 'code'
    }
};
