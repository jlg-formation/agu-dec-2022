import { Component, OnInit } from '@angular/core';
import { array, max, total } from '../../signaux';
import { webSocket } from 'rxjs/webSocket';
import { tap } from 'rxjs';

const url = `ws://${window.location.host}/truc`;
console.log('url: ', url);

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  array = array;
  max = max;
  total = total;

  webSocket = webSocket(url);
  constructor() {
    console.log('this.array: ', this.array);
  }

  ngOnInit(): void {
    this.webSocket
      .pipe(
        tap((data) => {
          console.log('data: ', data);
        })
      )
      .subscribe();
  }

  addRandom() {
    const array = this.array();
    array.push(23);
    this.array.set([...array]);
  }
}
