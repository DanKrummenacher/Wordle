export interface Letter {
  char: string;
  status: 'empty' | 'correct' | 'present' | 'absent';
}

export interface GameState {
  guesses: Letter[][];
  currentGuess: Letter[];
  turn: number;
  isGameOver: boolean;
  message: string;
}
