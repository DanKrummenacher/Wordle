import { Component, Input } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RowComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  @Input() guesses: { char: string, status: string }[][] = [];
  @Input() currentGuess: { char: string, status: string }[] = [];

  get allRows() {
    const all = [];

    if (this.guesses) {
      for (const guess of this.guesses) {
        all.push(guess);
      }
    }

    if (this.currentGuess && this.currentGuess.length > 0) {
      all.push(this.currentGuess);
    }

    while (all.length < 6) {
      all.push(undefined);
    }

    return all;
  }
}
