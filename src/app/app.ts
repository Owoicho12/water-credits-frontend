import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LucideAngularModule, WifiOff } from 'lucide-angular';
import { AppState } from './core/store/app.state';
import { setRouteError, clearRouteError } from './core/store/ui/ui.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly store = inject(Store<AppState>);

  protected readonly isOnline = signal<boolean>(true);
  protected readonly WifiOff = WifiOff;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isOnline.set(navigator.onLine);
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  private handleOnline = (): void => {
    this.isOnline.set(true);
    this.store.dispatch(clearRouteError());
  };

  private handleOffline = (): void => {
    this.isOnline.set(false);
    this.store.dispatch(setRouteError({ error: 'offline' }));
  };
}
