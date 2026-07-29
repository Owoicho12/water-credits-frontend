import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setRouteError } from '../store/ui/ui.actions';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: any): void {
    const loggingService = this.injector.get(LoggingService);
    loggingService.error('Unhandled Error:', error);

    // If it's a known non-critical error, we might ignore it.
    // Otherwise, dispatch a 500 error to the store.
    
    // We use NgZone.run to ensure the store dispatch happens in the Angular zone
    // since some errors might be thrown outside of it.
    this.zone.run(() => {
      const store = this.injector.get(Store<AppState>);
      // Don't override if it's already a 404 or 403 (these are handled explicitly)
      // For now, any unhandled error triggers a 500 page.
      store.dispatch(setRouteError({ error: '500' }));
    });
  }
}
