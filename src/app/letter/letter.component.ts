import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [NgClass],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent {
  @Input() letter: { char: string, status: string } | undefined;
}
