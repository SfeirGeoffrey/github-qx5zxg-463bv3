import { Component, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question, QuestionDTO } from '../question.type';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() displayResult: boolean = false;
  @Input() question: Question = new Question(
    new QuestionDTO('', '', '', '', '', [])
  );

  buttonColor: string = 'green';

  constructor(public questionService: QuestionService) {}

  selectAnswer(answerSelected: string) {
    if (this.question !== null && !this.displayResult) {
      this.question.answerSelected = answerSelected;
    }
  }

  determineBackgroundColor(answer: string): string {
    if (this.question !== null) {
      if (!this.displayResult) {
        if (this.question.answerSelected === answer) {
          return 'answer-selected';
        }
      } else {
        if (
          this.question.answerSelected === answer &&
          answer !== this.question.correctAnswer
        ) {
          return 'wrong-answer';
        } else if (answer === this.question.correctAnswer) {
          return 'good-answer';
        }
      }
    }

    return '';
  }
}
