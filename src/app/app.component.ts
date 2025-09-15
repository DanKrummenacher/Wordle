import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameService } from './game.service';
import { Observable } from 'rxjs';
import { GameState } from './game.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'wordle';
  gameState$!: Observable<GameState>;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameState$ = this.gameService.gameState$;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    const state = this.gameService.gameStateSubject.value;

    if (state.isGameOver) return;

    if (key.length === 1 && key >= 'A' && key <= 'Z') {
      this.gameService.addLetter(key);
    } else if (key === 'BACKSPACE') {
      this.gameService.removeLetter();
    } else if (key === 'ENTER') {
      this.gameService.submitGuess();
    }
  }

  restartGame() {
    this.gameService.startGame();
  }
}
