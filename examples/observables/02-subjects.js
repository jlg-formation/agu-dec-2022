const { Subject } = require("rxjs");

const subject = new Subject();

subject.next("a");
subject.next("b");
setTimeout(() => {
  subject.next("c");
  subject.complete();
}, 1000);

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
const s1 = subject.subscribe(observer("kiki"));
const s2 = subject.subscribe(observer("keke"));

setTimeout(() => {
  s1.unsubscribe();
  s2.unsubscribe();
}, 1500);
