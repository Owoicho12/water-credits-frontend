import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { clearRouteError } from '../../../core/store/ui/ui.actions';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div class="mb-6 text-slate-400 dark:text-slate-500">
        <ng-content select="[icon]"></ng-content>
      </div>
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
        {{ title }}
      </h1>
      <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
        {{ description }}
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          *ngIf="showRetry"
          (click)="onRetry()"
          class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center min-w-[140px] focus:ring-4 focus:ring-blue-500/20"
        >
          Retry
        </button>
        <button
          *ngIf="showHome"
          (click)="onGoHome()"
          class="px-6 py-2.5 bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium rounded-lg shadow-sm transition-all flex items-center justify-center min-w-[140px] focus:ring-4 focus:ring-slate-500/20"
        >
          Go Home
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class ErrorPageComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() showRetry = true;
  @Input() showHome = true;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private location: Location
  ) {}

  onRetry(): void {
    this.store.dispatch(clearRouteError());
    
    // Get the current path without query params
    const currentPath = this.location.path().split('?')[0];
    
    // Re-trigger the failed route resolver by navigating to the same route with a retry query parameter
    this.router.navigate([currentPath], { queryParams: { retry: Date.now() }, queryParamsHandling: 'merge' });
  }

  onGoHome(): void {
    this.store.dispatch(clearRouteError());
    this.router.navigate(['/dashboard']);
  }
}
