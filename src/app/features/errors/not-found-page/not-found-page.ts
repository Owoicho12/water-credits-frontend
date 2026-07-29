import { Component } from '@angular/core';
import { ErrorPageComponent } from '../error-page/error-page';
import { LucideAngularModule, SearchX } from 'lucide-angular';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [ErrorPageComponent, LucideAngularModule],
  template: `
    <app-error-page
      title="Page Not Found"
      description="The page you are looking for doesn't exist or has been moved."
      [showRetry]="false"
      [showHome]="true"
    >
      <lucide-icon name="search-x" icon class="w-16 h-16 opacity-80" strokeWidth="1.5"></lucide-icon>
    </app-error-page>
  `
})
export class NotFoundPageComponent {
  readonly SearchX = SearchX;
}
