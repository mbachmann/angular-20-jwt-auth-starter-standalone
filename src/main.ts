import { importProvidersFrom, InjectionToken } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { httpInterceptorProviders } from './app/_helpers/http.interceptor';
import { environment } from './environments/environment';

export const API_BASE_URL = new InjectionToken<string>('basePath');

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule),
    httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: API_BASE_URL,
      useValue: environment.API_BASE_PATH,
    },
  ],
}).catch(err => console.error(err));
