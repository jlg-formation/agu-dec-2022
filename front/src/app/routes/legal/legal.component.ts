import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { array, max, total } from '../../signaux';
import { webSocket } from 'rxjs/webSocket';
import { tap } from 'rxjs';
import { WdgComponent } from '@monentreprise/wdg';

const url = `ws://${window.location.host}/truc`;
console.log('url: ', url);

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [WdgComponent],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent {
  array = array;
  max = max;
  total = total;

  webSocket = webSocket(url);
  constructor() {
    console.log('this.array: ', this.array);
    this.webSocket.pipe(
      takeUntilDestroyed(),
      tap((data) => {
        console.log('data: ', data);
      })
    );
    // .subscribe();
  }

  addRandom() {
    const array = this.array();
    array.push(23);
    this.array.set([...array]);
  }
}
