import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';

import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
})
export class AppComponent implements OnInit {
  private storageService = inject(StorageService);
  private authService = inject(AuthService);
  private eventBusService = inject(EventBusService);
  private router = inject(Router);

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = 'angular-20-jwt-auth';
  eventBusSub?: Subscription;

  ngOnInit(): void {
    this.init();

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.eventBusService.on('login', (value: string) => {
      console.log('redirect', value);
      this.init();
    });
  }

  private init() {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['/', 'home']).then(nav => {
          window.location.reload();
        });
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
