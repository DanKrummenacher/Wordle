import { Injectable } from '@angular/core';
import { WordService } from './word.service';
import { BehaviorSubject } from 'rxjs';
import { Letter, GameState } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private secretWord!: string;
  private readonly maxTurns = 6;

  gameStateSubject = new BehaviorSubject<GameState>({
    guesses: [],
    currentGuess: [],
    turn: 0,
    isGameOver: false,
    message: ''
  });

  gameState$ = this.gameStateSubject.asObservable();

  constructor(private wordService: WordService) {
    this.startGame();
  }

  startGame(): void {
    this.secretWord = this.wordService.getRandomWord();
    const newGameState: GameState = {
      guesses: [],
      currentGuess: [],
      turn: 0,
      isGameOver: false,
      message: ''
    };
    this.gameStateSubject.next(newGameState);
  }

  addLetter(char: string): void {
    const state = this.gameStateSubject.value;
    if (state.currentGuess.length < 5 && !state.isGameOver) {
      const updatedGuess = state.currentGuess.slice();
      updatedGuess.push({ char: char.toUpperCase(), status: 'empty' } as Letter);

      const newGameState: GameState = {
        guesses: state.guesses,
        currentGuess: updatedGuess,
        turn: state.turn,
        isGameOver: state.isGameOver,
        message: state.message
      };
      this.gameStateSubject.next(newGameState);
    }
  }

  removeLetter(): void {
    const state = this.gameStateSubject.value;
    if (state.currentGuess.length > 0) {
      const updatedGuess = state.currentGuess.slice(0, -1);

      const newGameState: GameState = {
        guesses: state.guesses,
        currentGuess: updatedGuess,
        turn: state.turn,
        isGameOver: state.isGameOver,
        message: state.message
      };
      this.gameStateSubject.next(newGameState);
    }
  }

  submitGuess(): void {
    const state = this.gameStateSubject.value;
    if (state.currentGuess.length !== 5 || state.isGameOver) {
      return;
    }

    const newGuess: Letter[] = [];
    const guessWord = state.currentGuess.map(l => l.char).join('');
    const secretWordArr = this.secretWord.split('');

    for (let i = 0; i < 5; i++) {
      if (guessWord[i] === secretWordArr[i]) {
        newGuess[i] = { char: guessWord[i], status: 'correct' };
        secretWordArr[i] = '';
      }
    }

    for (let i = 0; i < 5; i++) {
      if (!newGuess[i]) {
        const presentIndex = secretWordArr.indexOf(guessWord[i]);
        if (presentIndex > -1) {
          newGuess[i] = { char: guessWord[i], status: 'present' };
          secretWordArr[presentIndex] = '';
        } else {
          newGuess[i] = { char: guessWord[i], status: 'absent' };
        }
      }
    }

    const updatedGuesses = state.guesses.slice();
    updatedGuesses.push(newGuess);

    const nextTurn = state.turn + 1;
    let message = '';
    let isGameOver = false;

    if (guessWord === this.secretWord) {
      message = 'Du hast gewonnen!';
      isGameOver = true;
    } else if (nextTurn === this.maxTurns) {
      message = `Leider Verloren! Das gesuchte Wort war: ${this.secretWord}.`;
      isGameOver = true;
    }

    const newGameState: GameState = {
      guesses: updatedGuesses,
      currentGuess: [],
      turn: nextTurn,
      isGameOver: isGameOver,
      message: message
    };

    this.gameStateSubject.next(newGameState);
  }
}
