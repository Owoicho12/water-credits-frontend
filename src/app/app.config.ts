import { ApplicationConfig, provideZoneChangeDetection, isDevMode, ErrorHandler, inject } from '@angular/core';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { Store } from '@ngrx/store';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './core/store/app.state';
import { AuthEffects } from './core/store/auth/auth.effects';
import { ProjectsEffects } from './core/store/projects/projects.effects';
import { CreditsEffects } from './core/store/credits/credits.effects';
import { RetirementEffects } from './core/store/retirement/retirement.effects';
import { GovernanceEffects } from './core/store/governance/governance.effects';
import { SensorsEffects } from './core/store/sensors/sensors.effects';
import { MarketplaceEffects } from './core/store/marketplace/marketplace.effects';
import { FarmersEffects } from './core/store/farmers/farmers.effects';
import { AnalyticsEffects } from './core/store/analytics/analytics.effects';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { setRouteError } from './core/store/ui/ui.actions';
import { CacheInvalidationEffects } from './core/store/cache-invalidation.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withNavigationErrorHandler((error: any) => {
        // When a router navigation fails (e.g., resolver throws, or navigation cancelled via error)
        // We dispatch a 500 or 404. Here we can default to 500.
        const store = inject(Store);
        store.dispatch(setRouteError({ error: '500' }));
      })
    ),
    provideStore(reducers),
    provideEffects([
      AuthEffects,
      ProjectsEffects,
      CreditsEffects,
      RetirementEffects,
      GovernanceEffects,
      SensorsEffects,
      MarketplaceEffects,
      FarmersEffects,
      AnalyticsEffects,
      CacheInvalidationEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
