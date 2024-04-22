const { Observable } = require("rxjs");

const obs = new Observable((subscriber) => {
  subscriber.next(45);
  subscriber.next({ truc: 123 });
  const timer = setTimeout(() => {
    subscriber.next(false);
    subscriber.complete();

    subscriber.next(456);
  }, 10000);

  return () => {
    console.log("je meurs");
    clearTimeout(timer);
  };
});

const s = obs.subscribe({
  next: (data) => {
    console.log("data: ", data);
  },
  complete: () => {
    console.log("complete");
  },
  error: (err) => {
    console.log("err: ", err);
  },
});

s.unsubscribe();
