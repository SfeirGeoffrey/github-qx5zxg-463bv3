import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoriesDTO, Category } from '../category.type';
import { Difficulty } from '../difficulty.type';
import { OpenTdbService } from '../open-tdb.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categorySelected: number | null = null;

  colorCreateButtonColor: string = 'grey';

  difficulties: Difficulty[] = [
    new Difficulty('Easy', 'easy'),
    new Difficulty('Medium', 'medium'),
    new Difficulty('Hard', 'hard'),
  ];
  difficultySelected: string | null = null;

  private categoriesObserver$: Observable<CategoriesDTO | null> =
    this.openTdbService.getCategories();
  private subscription: Subscription = new Subscription();

  constructor(
    private openTdbService: OpenTdbService,
    public questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.subscription = this.categoriesObserver$.subscribe((response) => {
      if (response !== null) {
        this.categories = response.trivia_categories;
      } else {
        console.error(
          'Error during the call : Get categories. Try again later.'
        );
        this.categories = [];
      }
    });
  }

  createQuiz(): void {
    if (this.categorySelected !== null && this.difficultySelected !== null) {
      this.questionService.createQuiz(
        5,
        this.categorySelected,
        this.difficultySelected,
        'multiple'
      );
    } else {
      console.error('Please choose a category and a difficulty.');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
