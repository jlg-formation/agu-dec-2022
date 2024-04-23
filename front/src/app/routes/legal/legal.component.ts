import { Component } from '@angular/core';
import { array, max, total } from '../../signaux';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent {
  array = array;
  max = max;
  total = total;
  constructor() {
    console.log('this.array: ', this.array);
  }

  addRandom() {
    const array = this.array();
    array.push(23);
    this.array.set([...array]);
  }
}
