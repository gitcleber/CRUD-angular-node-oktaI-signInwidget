import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dev Class';
  public isAuthenticated: boolean = false;

  public isAuthenticated$!: Observable<boolean>;

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth){
    this._oktaStateService.authState$.subscribe(
      (isAuthenticated) => this.isAuthenticated = isAuthenticated.isAuthenticated ?? false
    );
  }

  public async ngOnInit() {
    // this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
    //   filter((s: AuthState)=>!!s),
    //   map((s: AuthState) => s.isAuthenticated ?? false)
    // );    
    this.isAuthenticated = await this._oktaAuth.isAuthenticated();
  }

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['/profile'])
    );
  }

  public async signOut() : Promise<void> {
    await this._oktaAuth.signOut();
  }
}
