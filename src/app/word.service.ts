import { Injectable } from '@angular/core';

export const WORDS = [
  'BAUCH', 'BRAUN', 'DAUER', 'DICHT', 'FRAGE', 'FRIST', 'JAHRE', 'JUNGE', 'KARTE', 'KEGEL',
  'KLEIN', 'KNALL', 'KREIS', 'LANGE', 'LEBEN', 'LIEBE', 'LICHT', 'MACHT', 'NACHT', 'NEBEN',
  'NICHT', 'OFFEN', 'RAUCH', 'REISE', 'SAGEN', 'SEHEN', 'SONNE', 'SPORT', 'STERN', 'STADT',
  'TISCH', 'VATER',
];

@Injectable({
  providedIn: 'root'
})
export class WordService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }

  isWordValid(word: string): boolean {
    return WORDS.includes(word);
  }
}
