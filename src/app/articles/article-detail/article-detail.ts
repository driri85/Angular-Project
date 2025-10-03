import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

interface Article {
  id: string;
  title: string;
  desc: string;
  author: string;
  imgPath: string;
}

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.scss']
})
export class ArticleDetail implements OnInit {
  article: Article | null = null;
  message: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.fetchArticle(articleId);
    } else {
      this.message = 'Article ID is missing';
    }
  }

  async fetchArticle(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/articles/${id}`);
      const data = await res.json();

      if (res.ok) {
        this.article = data.data;
      } else {
        this.message = data.message || 'Failed to fetch article';
      }
    } catch (err) {
      console.error(err);
      this.message = 'Error connecting to server';
    }
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

  modifyArticle() {
    if (this.article) {
      this.router.navigate([`/articles/${this.article.id}/edit`]);
    }
  }

  async deleteArticle() {
    if (!this.article) return;

    const confirmDelete = confirm(`Are you sure you want to delete "${this.article.title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/articles/${this.article.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Article deleted successfully');
        this.router.navigate(['/articles']);
      } else {
        this.message = data.message || 'Failed to delete article';
      }
    } catch (err) {
      console.error(err);
      this.message = 'Error connecting to server';
    }
  }
}
