import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, Token, Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import appConfig from '../app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn: any;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.signIn = new OktaSignIn({
      baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      authParams:{
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes
      },
      logo: 'assets/okta-widget/angular.svg',
      features: {
        registration: true,
      },
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Dev Class App',
        },
      },
      authClient: oktaAuth,
      useInteractionCodeFlow: appConfig.widget.useInteractionCodeFlow,
    });
   }

  ngOnInit(): void {
    // this.signIn.renderEl({el: '#okta-sign-in-widget'},
    // (resp:any)=>{
    //   if(resp.status === 'SUCCESS'){
    //     this.oktaAuth.signInWithRedirect();
    //   }
    // },
    // (error:any) => {
    //   throw error;
    // });
    this.signIn.showSignInToGetTokens({
      el: '#okta-sign-in-widget',
      scopes: appConfig.oidc.scopes}).then(
        (tokens: Tokens) =>{
          //remove the widget
          this.signIn.remove();

          // In this flow the redirect to Okta occurs in a hidden iframe
          this.oktaAuth.handleLoginRedirect(tokens);
        }).catch((err: any) =>{
          // Typically due to misconfiguration
          throw err;          
        });
      }

  ngOnDestroy() {
    this.signIn.remove();
  }

}
