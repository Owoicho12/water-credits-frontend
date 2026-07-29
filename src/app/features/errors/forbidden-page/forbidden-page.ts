import { Component } from '@angular/core';
import { ErrorPageComponent } from '../error-page/error-page';
import { LucideAngularModule, ShieldAlert } from 'lucide-angular';

@Component({
  selector: 'app-forbidden-page',
  standalone: true,
  imports: [ErrorPageComponent, LucideAngularModule],
  template: `
    <app-error-page
      title="Access Denied"
      description="You don't have permission to access this page. Please contact support if you believe this is an error."
      [showRetry]="false"
      [showHome]="true"
    >
      <lucide-icon name="shield-alert" icon class="w-16 h-16 opacity-80" strokeWidth="1.5"></lucide-icon>
    </app-error-page>
  `
})
export class ForbiddenPageComponent {
  readonly ShieldAlert = ShieldAlert;
}
