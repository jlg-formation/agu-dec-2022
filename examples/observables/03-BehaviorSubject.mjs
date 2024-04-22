import { BehaviorSubject } from "rxjs";

const b = new BehaviorSubject(12);

const observer = (name) => ({
  next: (data) => {
    console.log(`${name} data: `, data);
  },
  complete: () => {
    console.log(`${name} complete`);
  },
  error: (err) => {
    console.log("err: ", err);
  },
});

const s = b.subscribe(observer("truc"));
