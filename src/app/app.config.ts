import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { RestLink } from 'apollo-link-rest';
import { environment } from '../environments/environment.generated';

const restLink = new RestLink({
  uri: environment.apiBaseUrl
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      return {
        link: restLink,
        cache: new InMemoryCache(),
      };
    }),
  ]
};
