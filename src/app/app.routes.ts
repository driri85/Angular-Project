import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { ArticlesList } from './articles/articles-list/articles-list';
import { ArticleDetail } from './articles/article-detail/article-detail';
import { ArticleForm } from './articles/article-form/article-form';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },

  { path: 'articles', component: ArticlesList },
  { path: 'articles/new', component: ArticleForm },
  { path: 'articles/:id', component: ArticleDetail },
  { path: 'articles/:id/edit', component: ArticleForm },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
