import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';
import { MenuItem } from './material/menu-item.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;

  title = 'Tour of Heroes';

  menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      routerLink: '/dashboard',
      toolTipText: 'Dashboard'
    },
    {
      icon: 'sports_martial_arts',
      routerLink: '/heroes',
      toolTipText: 'Heroes'
    }
  ]

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggetdIn$;
  }

  onLogout(): void {
    this.authService.logout();
  }

}
