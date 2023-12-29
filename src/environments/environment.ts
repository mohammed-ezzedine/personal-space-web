export const environment = {
    serverBaseUrl: '/api',
    auth: {
        issuerUrl: 'https://lemur-1.cloud-iam.com/auth/realms/mezzedine-auth-server',
        clientId: 'personal-space-web',
        scope: 'openid',
        grantType: 'code'
    }
};
