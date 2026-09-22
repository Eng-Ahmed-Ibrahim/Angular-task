import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from '@relynn/ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([

      ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "top"
      })
    ),
    provideToastr()

  ]
};
