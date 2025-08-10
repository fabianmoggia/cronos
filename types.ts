export enum GameMode {
  YearToCentury = 'YtoC',
  CenturyToYear = 'CtoY',
}

export type Era = 'a.C.' | 'd.C.';

export interface Challenge {
  year?: number;
  century?: number;
  era: Era;
}

export interface FeedbackInfo {
  isCorrect: boolean;
  correctAnswer: string;
  userAnswer: string;
  challenge: Challenge;
  explanation:string;
  userAnswerValue?: string;
  userAnswerEra?: Era;
}