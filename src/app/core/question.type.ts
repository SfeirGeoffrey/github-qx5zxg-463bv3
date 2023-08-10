export class QuestionsDTO {
  constructor(public response_code: number, public results: QuestionDTO[]) {
    this.response_code = response_code;
    this.results = results;
  }
}

export class QuestionDTO {
  constructor(
    public category: string,
    public difficulty: string,
    public type: string,
    public question: string,
    public correct_answer: string,
    public incorrect_answers: string[]
  ) {
    this.category = category;
    this.difficulty = difficulty;
    this.type = type;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}

export class Question {
  public category: string;
  public difficulty: string;
  public type: string;
  public question: string;
  public correctAnswer: string;
  public incorrectAnswers: string[];
  public mixedAnswers: string[] | null;
  public answerSelected: string | null;
  constructor(public questionDTO: QuestionDTO) {
    this.category = questionDTO.category;
    this.difficulty = questionDTO.difficulty;
    this.type = questionDTO.type;
    this.question = questionDTO.question;
    this.correctAnswer = questionDTO.correct_answer;
    this.incorrectAnswers = questionDTO.incorrect_answers;
    this.mixedAnswers = null;
    this.answerSelected = null;
  }
}
