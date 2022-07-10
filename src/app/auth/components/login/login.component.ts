import { AuthService } from './../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    email: [{ value: 'victor@gmail.com', disabled: true },
    [Validators.email, Validators.required],
    ],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
  }

}