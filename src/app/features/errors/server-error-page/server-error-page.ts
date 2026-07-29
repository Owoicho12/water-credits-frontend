import { Component } from '@angular/core';
import { ErrorPageComponent } from '../error-page/error-page';
import { LucideAngularModule, ServerCrash } from 'lucide-angular';

@Component({
  selector: 'app-server-error-page',
  standalone: true,
  imports: [ErrorPageComponent, LucideAngularModule],
  template: `
    <app-error-page
      title="Server Error"
      description="We're experiencing internal server issues. Please try again later."
      [showRetry]="true"
      [showHome]="true"
    >
      <lucide-icon name="server-crash" icon class="w-16 h-16 opacity-80" strokeWidth="1.5"></lucide-icon>
    </app-error-page>
  `
})
export class ServerErrorPageComponent {
  readonly ServerCrash = ServerCrash;
}
