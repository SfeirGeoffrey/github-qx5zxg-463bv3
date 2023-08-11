import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CategoriesDTO } from './category.type';
import { QuestionsDTO } from './question.type';

@Injectable({
  providedIn: 'root',
})
export class OpenTdbService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<CategoriesDTO | null> {
    return this.httpClient
      .get<CategoriesDTO>('https://opentdb.com/api_category.php')
      .pipe(
        tap(() => console.log(`Call getCategories`)),
        catchError((err) => {
          console.error(err);
          return of(null);
        })
      );
  }

  getQuestions(
    amount: number,
    category: number,
    difficulty: string,
    type: string
  ): Observable<QuestionsDTO | null> {
    const url: string =
      'https://opentdb.com/api.php?amount=' +
      amount +
      '&category=' +
      category +
      '&difficulty=' +
      difficulty +
      '&type=' +
      type;

    return this.httpClient.get<QuestionsDTO>(url).pipe(
      tap(() => console.log(`Call getQuestions`)),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }
}
