import { Component, Input } from '@angular/core';
import { LetterComponent } from '../letter/letter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [LetterComponent, CommonModule],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class RowComponent {

  @Input() guess: { char: string, status: string }[] | undefined;

  get filledGuess() {
    const filled = [];

    if (this.guess) {
      for (const letter of this.guess) {
        filled.push(letter);
      }
    }

    while (filled.length < 5) {
      filled.push({ char: '', status: 'empty' });
    }

    return filled;
  }
}
