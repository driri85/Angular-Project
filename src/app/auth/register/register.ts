import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  email: string = '';
  password: string = '';
  message: string = '';
  passwordConfirm: string = '';
  pseudo: string = '';
  cityCode: string = '';
  city: string = '';
  phone: string = '';

  constructor(private router: Router) {}

  async onSubmit() {
    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password, passwordConfirm: this.passwordConfirm, pseudo: this.pseudo, cityCode: this.cityCode, city: this.city, phone: this.phone }),
      });

      const data = await res.json();
      this.message = data.message || 'Registration successful';
      if (data.code =="200") {
        this.router.navigate(['/login']);
      }
    } catch (err) {
      this.message = 'Error connecting to server';
    }
  }

  async Login() {
    this.router.navigate(['/login']);
  }
}
