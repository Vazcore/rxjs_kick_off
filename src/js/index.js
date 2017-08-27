import { Observable } from "rxjs";
import "rxjs/add/operator/mergeMap";
import { DOM } from "rx-dom";


// Classic way

document.body.addEventListener('mousemove', function(event) {
  //console.log(event.clientX, event.clientY);
});


// Side effect -> external state variable
var clicks = 0;
document.addEventListener('click', function registerClicks(event) {
  // if (clicks < 3) {
  //   clicks++;
  //   console.log(event.clientX, event.clientY);
  // } else {
  //   document.removeEventListener('click', registerClicks);
  // }
});









// Using RxJS
var clicks$ = Observable.fromEvent(document, 'click')
.filter(event => {
  return event.clientX < (window.innerWidth / 2);
})
.take(3);

clicks$.subscribe(e => console.log(e));

/**
 * Definition of a Stream
 *   (left)  (right) (left)  (left)  (left)
 * ---click---click---click---click---click--->
 * ___________filter left__________________
 * ---click-----------click---click---click--->
 * ______________take 3_______________________
 * ---click-----------click---click----||--->
 * 
*/








var observable$ = Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete(); // We are done
});

//observable$.subscribe(console.log);












/**
 * Range
 * 
*/

var range$ = Observable.range(1,5);
//range$.subscribe(console.log);
/*
*  ----1-----2-----3----4---5----|--->
*/













/*
 * Map 
 * 
 *  ----1-----2-----3----4-----5----|--->
 * ____map{ () -> * }____________________
 *  ---(1)---(2)---(3)--(4)---(5)---|--->  
*/

var doubleRange$ = range$.map(val => val * 2);
//doubleRange$.subscribe(console.log);













/*
 * Filter 
 * 
 *  ----1-----2-----3----4-----5----|--->
 * ____filter{ if true }____________________
 *  ----------2----------4----------|--->  
*/

// range$.filter(val => val % 2 === 0)
// .subscribe(console.log);















/*
 * Reduce 
 * 
 *  ----1-----2-----3----4-----5----|--->
 *      |     |     |    |     |
 *  ----1-----3-----6----10----15----|--->
 * ____reduce{ x, y -> x + y }____________________
 *  ---------------------------15-----|--->  
*/

// range$.reduce((result, next_val) => {
//   return result + next_val;
// })
// .subscribe(console.log);












// Average value
var avg$ = range$.reduce((result, next_val) => {
  return {
    sum: result.sum + next_val,
    count: result.count + 1
  };
}, {sum: 0, count: 0})
.map(state => {
  return state.sum / state.count;
});

// avg$.subscribe(avg => {
//   console.log(avg);
// });














/**
 * Infinite calculation
*/

var average$ = Observable.interval(2000)
.map(() => {
  return Math.random() * 100;
})
.scan((result, new_val) => {
  return {
    sum: result.sum + new_val,
    count: result.count + 1,
    current: new_val 
  };
}, { sum: 0, count: 0 })
.map(state => {
  return {
    average: Math.floor(state.sum / state.count),
    current: Math.floor(state.current)
  };
})
// .subscribe(result => {
//   console.table([result]);
// });














/**
 * FlatMap
*/

let person$ = Observable
.ajax({
  url : 'http://swapi.co/api/people/1',
  crossDomain: true, 
  createXHR: function () {
    return new XMLHttpRequest();
  }
})
.map(e => e.response);

// const subscription = person$
// .subscribe(res => {
//     console.log(res)
// });




const fetchSubscription = Observable
.from(fetch('http://swapi.co/api/people/1'))
.flatMap((res) => Observable.from(res.json()) )
// .subscribe((fetchRes) => {
//     console.log('fetch sub', fetchRes);
// })












/**
 * Explicit cancellation
*/

// var averageSubscription = average$.subscribe(data => {
//   console.table([data])
// })

// setTimeout(() => {  
//   averageSubscription.unsubscribe();
//   console.log('averageSubscription was cancelled');
// }, 5000);









/**
 * Wraping External API   (Promise)
*/

var p = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000);
});

var promise$ = Observable.fromPromise(p);

// var subscribtionForPromise = promise$.subscribe(() => {
//   console.log('Promise was resolved!!!');
// });

// subscribtionForPromise.unsubscribe();
// console.log('averageSubscription was cancelled');

// p.then(() => {
//   console.log('Promise was resolved!!! Side effect');
// })













/**
*  Handling errors
*/


function getJSON(arr) {
  return Rx.Observable.from(arr)
  .map(str => JSON.parse(str))
}


var json$ = getJSON(
  [
    '{"name": "Alex"}',    
    '{"name: "Alex"}',
    '{"name": "John Snow"}'
  ]
)
// .subscribe(
//   json => console.table([json]), // onNext
//   err  => console.table([{error: 'Parsing JSON error'}]) // on Error
// )






