import { Router } from '@angular/router';
import { Credentials } from './../models/credentials.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggetdIn = new BehaviorSubject<boolean>(false);

  isLoggetdIn$ = this.loggetdIn.asObservable();

  constructor(private router: Router) { }

  login(credentials: Credentials): void {
    localStorage.setItem('token', credentials.password);
    this.updateLoggedIn();
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.clear();
    this.updateLoggedIn();
    this.router.navigate(['/login']);
  }

  updateLoggedIn(): void {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
      this.loggetdIn.next(true);
    } else {
      this.loggetdIn.next(false);
    }
  }

}
