import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OpenTdbService } from './open-tdb.service';
import { Question, QuestionsDTO } from './question.type';

@Injectable({
  providedIn: 'root',
})
export class QuestionService implements OnDestroy {
  questionnaire: Question[] = [];

  nbCorrectAnswers: number = 0;

  private questionsObserver$: Observable<QuestionsDTO | null> = of(null);
  private subscription: Subscription = new Subscription();

  constructor(private openTdbService: OpenTdbService) {}

  public createQuiz(
    amount: number,
    category: number,
    difficulty: string,
    type: string
  ): void {
    this.questionnaire = [];
    this.questionsObserver$ = this.openTdbService.getQuestions(
      amount,
      category,
      difficulty,
      type
    );
    this.subscription = this.questionsObserver$.subscribe((response) => {
      if (response !== null && response.response_code === 0) {
        response.results.forEach((questionDTO) => {
          this.questionnaire.push(new Question(questionDTO));
        });
        this.questionnaire.forEach((question) => {
          question = this.createAnswersList(question);
        });
      } else {
        console.error(
          'Error during the call : Get Questions. Try again later.'
        );
      }
    });
  }

  private createAnswersList(question: Question): Question {
    const randomNumber = Math.floor(
      Math.random() * (question.incorrectAnswers.length + 1)
    );
    question.mixedAnswers = [...question.incorrectAnswers];
    question.mixedAnswers.splice(randomNumber, 0, question.correctAnswer);
    return question;
  }

  public isQuestionnaireCompleted(): boolean {
    let isCompleted: boolean = true;
    this.questionnaire.forEach((question) => {
      if (!question.answerSelected) {
        isCompleted = false;
      }
    });
    return isCompleted;
  }

  public calculResults(): void {
    this.nbCorrectAnswers = this.questionnaire.filter(
      (question) => question.answerSelected === question.correctAnswer
    ).length;
  }

  public reset(): void {
    this.nbCorrectAnswers = 0;
    this.questionnaire = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
