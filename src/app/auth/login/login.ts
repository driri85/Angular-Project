import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) {}

  async onSubmit() {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.username, password: this.password }),
      });
      const data = await res.json();
      this.message = data.message || 'Login successful';
      if (data.code=="200") {
        this.router.navigate(['/articles']);
      }
    } catch (err) {
      this.message = 'Error connecting to server';
    }
  }

  async Register() {
    this.router.navigate(['/register']);
  }

  async ForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
