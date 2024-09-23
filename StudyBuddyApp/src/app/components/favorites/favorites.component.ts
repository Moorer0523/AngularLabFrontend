import { Component, inject } from '@angular/core';
import { FavoritesApiService } from '../../services/favorites-api.service';
import { Favorites } from '../../models/favorites';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question';
import { QuestionApiService } from '../../services/question-api.service';
import { QuestionListComponent } from "../question-list/question-list.component";
import { CommonModule } from '@angular/common';
import { group } from '@angular/animations';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,QuestionListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  favorites: Favorites = {userId: 0, favoriteQuestions: []}
  questions: Question[] = [];
  favoriteQuestions: Question[] = []

  groupedFavorites = new Array<Question[]>();

  route = inject(ActivatedRoute);

  constructor(
    private favoritesApi: FavoritesApiService,
    private questionAPI: QuestionApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Loading Favorites from ' + id);
    if (id) {
      this.loadFavorites(Number(id));

    }
  }

  loadFavorites(id: number) {
    this.favoritesApi.getFavorites(id).subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Loading favorites complete');
        this.loadFavoriteQuestions(this.favorites.favoriteQuestions);

      },
    });


  }


  //brings in the favorite question that matches the id of the input
  loadFavoriteQuestions(favoriteQuestions: number[]) {
    this.questionAPI.getQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Loading questions complete');

        this.splitQuestionsByFavorites()
      },
    });
  }

  splitQuestionsByFavorites() {
        //idk what to even say about this. It checks if the item exists, then checks if the item is on the favorites list, THEN determines if it needs to splice the array or not
        console.log('starting split questions')
        console.log(this.favorites)
        this.favorites.favoriteQuestions.forEach(x => this.favoriteQuestions.push(this.questions[x]))
        console.log(this.favoriteQuestions)
  }

  splitFavorites() {
    console.log('splitting favorites')
    if (this.favoriteQuestions.length != null) {
      for (let i = 0, j = 0; i < this.favoriteQuestions.length; i++) {
        if (i >= 3 && i % 3 === 0) {
          j++;
        }
        this.groupedFavorites[j] = this.groupedFavorites[j] || [];
        this.groupedFavorites[j].push(this.favoriteQuestions[i]);
        console.log('loop count:' + i)
      }
    }
    console.log("Question list Length:", this.favoriteQuestions.length)
    console.log(this.groupedFavorites)
  }
}
