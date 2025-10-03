import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPassword  {
  email: string = '';
  message: string = '';
  newPassword: string = '';

  constructor(private router: Router) {}

  async onSubmit() {
    try {
      const res = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email }),
      });

      const data = await res.json();

      if (data.code === "200") {
        this.message = data.message;
        this.newPassword = data.data; // display the new password
      } else {
        this.message = data.message || 'Erreur lors de la réinitialisation';
      }
    } catch (err) {
      this.message = 'Erreur de connexion au serveur';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
