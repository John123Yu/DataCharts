import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as exporting from 'highcharts/modules/exporting.src';
import * as histogramBellcurve from 'highcharts/modules/histogram-bellcurve.src';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { ZipcodeTaxComponent } from './zipcode-tax/zipcode-tax.component';
import { HighchartsZipcodeTaxComponent } from './highcharts-zipcode-tax/highcharts-zipcode-tax.component';
import { NotFoundComponent } from './not-found/not-found.component';

declare var require: any;

export function tokenGetter() {
  return localStorage.getItem('token');
}
export function highchartsModules() {
  return [exporting, histogramBellcurve];
}

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    ZipcodeTaxComponent,
    HighchartsZipcodeTaxComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    LeafletModule.forRoot(),
    BrowserModule,
    ChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
