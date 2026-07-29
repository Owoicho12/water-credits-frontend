import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';
import { AppState } from '../../../core/store/app.state';
import { selectRouteError } from '../../../core/store/ui/ui.selectors';
import { NotFoundPageComponent } from '../../../features/errors/not-found-page/not-found-page';
import { ServerErrorPageComponent } from '../../../features/errors/server-error-page/server-error-page';
import { ForbiddenPageComponent } from '../../../features/errors/forbidden-page/forbidden-page';
import { NetworkErrorPageComponent } from '../../../features/errors/network-error-page/network-error-page';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    SidebarComponent,
    AsyncPipe,
    NotFoundPageComponent,
    ServerErrorPageComponent,
    ForbiddenPageComponent,
    NetworkErrorPageComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>
      <div class="flex flex-1">
        <app-sidebar></app-sidebar>
        <main class="flex-1 p-6 overflow-y-auto bg-slate-50 dark:bg-dark-bg">
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
        </main>
      </div>
    </div>
  `,
  styles: [],
})
export class DefaultLayoutComponent {
  private store = inject(Store<AppState>);
  routeError$ = this.store.select(selectRouteError);
}
