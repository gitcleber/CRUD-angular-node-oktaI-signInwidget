

export default{
  oidc: {
    clientId: '0oa6fawe2p6XqcAI15d7',
    issuer: 'https://dev-62087076.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ["openid", "profile", "email"],
    testing: {
      disableHttpsCheck: true,
    },
  },
  widget: {
    useInteractionCodeFlow: true,
  },
};

// export const oktaConfig = {
//     clientId: '0oa6fawe2p6XqcAI15d7',
//     issuer: 'https://dev-62087076.okta.com/oauth2/default',
//     redirectUri: 'http://localhost:4200/login/callback',
//     scopes: ["openid","profile", "email"],
//     pkce: true,
//     disableHttpsCheck: true,
//   };