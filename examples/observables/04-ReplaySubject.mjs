import { ReplaySubject } from "rxjs";

const rs = new ReplaySubject(2);

rs.next(45);
rs.next(56);
rs.next(67);

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

const s = rs.subscribe(observer("tata"));

rs.next(12);
