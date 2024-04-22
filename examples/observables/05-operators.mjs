import { Observable, interval, startWith, map, take } from "rxjs";

const addPrefix = (obs) => {
  return new Observable((subscriber) => {
    const s = obs.subscribe({
      next: (data) => {
        subscriber.next("a" + data);
      },
      error: (err) => {
        subscriber.error(err);
      },
      complete: () => {
        subscriber.complete();
      },
    });
  });
};

const add500ms = (obs) => {
  return new Observable((subscriber) => {
    const s = obs.subscribe({
      next: (data) => {
        subscriber.next(data);
        setTimeout(() => {
          subscriber.next("after 500 " + data);
        }, 500);
      },
      error: (err) => {
        subscriber.error(err);
      },
      complete: () => {
        subscriber.complete();
      },
    });
  });
};

// const o = take(4)(map((x) => x + 1)(startWith(-1)(interval(1000))));
// o.subscribe();

const o2 = interval(1000).pipe(
  startWith(-1),
  map((x) => x + 1),
  take(4),
  add500ms,
  addPrefix
);

o2.subscribe(console.log);
