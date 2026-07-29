import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../../core/store/app.state';
import { selectRouteError } from '../../../core/store/ui/ui.selectors';
import { NotFoundPageComponent } from '../../../features/errors/not-found-page/not-found-page';
import { ServerErrorPageComponent } from '../../../features/errors/server-error-page/server-error-page';
import { ForbiddenPageComponent } from '../../../features/errors/forbidden-page/forbidden-page';
import { NetworkErrorPageComponent } from '../../../features/errors/network-error-page/network-error-page';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NotFoundPageComponent,
    ServerErrorPageComponent,
    ForbiddenPageComponent,
    NetworkErrorPageComponent
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg p-4">
      <div class="max-w-md w-full">
        @if (routeError$ | async; as error) {
          @switch (error) {
            @case ('404') { <app-not-found-page /> }
            @case ('500') { <app-server-error-page /> }
            @case ('403') { <app-forbidden-page /> }
            @case ('offline') { <app-network-error-page /> }
          }
        } @else {
          <router-outlet></router-outlet>
        }
      </div>
    </div>
  `,
  styles: [],
})
export class AuthLayoutComponent {
  private store = inject(Store<AppState>);
  routeError$ = this.store.select(selectRouteError);
}
