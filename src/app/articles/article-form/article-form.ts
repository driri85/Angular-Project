import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

interface Article {
  id?: string;
  title: string;
  desc: string;
  author: string;
  imgPath: string;
}

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './article-form.html',
  styleUrls: ['./article-form.scss']
})
export class ArticleForm implements OnInit {
  article: Article = {
    title: '',
    desc: '',
    author: '',
    imgPath: ''
  };
  message: string = '';
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.isEdit = true;
      this.fetchArticle(articleId);
    }
  }

  async fetchArticle(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/articles/${id}`);
      const data = await res.json();

      if (res.ok) {
        this.article = data; // includes id
      } else {
        this.message = data.message || 'Failed to fetch article';
      }
    } catch (err) {
      console.error(err);
      this.message = 'Error connecting to server';
    }
  }

  async onSubmit() {
    try {
      // Send the article as JSON including `id` if editing
      const res = await fetch('http://localhost:3000/articles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.article),
      });

      const data = await res.json();

      if (res.ok) {
        this.message = data.message || (this.isEdit ? 'Article updated' : 'Article created');
        this.router.navigate(['/articles']);
      } else {
        this.message = data.message || 'Failed to save article';
      }
    } catch (err) {
      console.error(err);
      this.message = 'Error connecting to server';
    }
  }

  cancel() {
    this.router.navigate(['/articles']);
  }
}
