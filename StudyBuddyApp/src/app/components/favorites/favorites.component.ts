import { Component, inject } from '@angular/core';
import { FavoritesApiService } from '../../services/favorites-api.service';
import { Favorites } from '../../models/favorites';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question';
import { QuestionApiService } from '../../services/question-api.service';
import { QuestionListComponent } from "../question-list/question-list.component";
import { CommonModule } from '@angular/common';

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

  groupedFavorites = new Array<Question[]>();

  route = inject(ActivatedRoute);
  currentIndex: number = 0;

  constructor(
    private favoritesApi: FavoritesApiService,
    private questionAPI: QuestionApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //used to pull the favorites related to the imported ID
    console.log('Loading Favorites');
    if (id) {
      this.loadFavorites(Number(id));
    }
  }

  loadFavorites(id: number) {
    this.favoritesApi.getFavorites(id).subscribe({
      next: (data) => {
        this.favorites = data;
        //once the data is loaded, calls the favoritequestions array to splice things
        this.loadFavoriteQuestions(this.favorites.favoriteQuestions);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Loading favorites complete');
      },
    });

    this.splitFavorites()
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
      },
    });

    //idk what to even say about this. It checks if the item exists, then checks if the item is on the favorites list, THEN determines if it needs to splice the array or not
    this.questions?.map((question) => {
      if (this.questions?.indexOf(question) != undefined)
        if (this.checkFavorite(this.questions.indexOf(question))) {
          const questionIndex = this.questions.indexOf(question, 0);
          this.questions.splice(questionIndex, 1);
        }
    });
  }

  checkFavorite(index: number): boolean {
    if (this.favorites?.favoriteQuestions.includes(index, 0)) return false;
    return true;
  }
  splitFavorites() {
    if (this.questions.length != null) {
      for (let i = 0, j = 0; i < this.questions.length; i++) {
        if (i >= 3 && i % 3 === 0) {
          j++;
        }
        this.groupedFavorites[j] = this.groupedFavorites[j] || [];
        this.groupedFavorites[j].push(this.questions[i]);
        console.log('loop count:' + i)
      }
    }
    console.log("Question list Length:", this.questions.length)
  }
}
