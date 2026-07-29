import { Component } from '@angular/core';
import { ErrorPageComponent } from '../error-page/error-page';
import { LucideAngularModule, WifiOff } from 'lucide-angular';

@Component({
  selector: 'app-network-error-page',
  standalone: true,
  imports: [ErrorPageComponent, LucideAngularModule],
  template: `
    <app-error-page
      title="You're Offline"
      description="It seems you've lost your internet connection. Please check your network and try again."
      [showRetry]="true"
      [showHome]="false"
    >
      <lucide-icon name="wifi-off" icon class="w-16 h-16 opacity-80" strokeWidth="1.5"></lucide-icon>
    </app-error-page>
  `
})
export class NetworkErrorPageComponent {
  readonly WifiOff = WifiOff;
}
