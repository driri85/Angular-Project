import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Article {
  id: string;
  title: string;
  desc: string;
  author: string;
  imgPath: string;
}

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './articles-list.html',
  styleUrls: ['./articles-list.scss']
})
export class ArticlesList implements OnInit {
  articles: Article[] = [];
  message: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchArticles();
  }

  async fetchArticles() {
    try {
      const res = await fetch('http://localhost:3000/articles');
      const data = await res.json();

      if (res.ok) {
        this.articles = Array.isArray(data) ? data : data.data;
      } else {
        this.message = data.message || 'Failed to fetch articles';
      }
    } catch (err) {
      console.error(err);
      this.message = 'Error connecting to server';
    }
  }

  goToArticle(id: string) {
    this.router.navigate([`/articles/${id}`]);
  }

  createNewArticle() {
    this.router.navigate(['/articles/new']);
  }
}
