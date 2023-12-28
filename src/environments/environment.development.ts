export const environment = {
    serverBaseUrl: 'http://localhost:8080',
    auth: {
        issuerUrl: 'https://lemur-1.cloud-iam.com/auth/realms/mezzedine-auth-server',
        clientId: 'personal-space-web',
        scope: 'openid',
        grantType: 'code'
    }
};
