import { Observable } from "rxjs";
import "rxjs/add/operator/mergeMap";
import fetchJsonp from 'fetch-jsonp';

var userInputs$ = Observable
.fromEvent(document.querySelector('#search_input'), 'keyup')
.map(event => event.target.value)
.debounceTime(1500)
.distinctUntilChanged()
.flatMap(keyword => Observable.from(
  fetchJsonp('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK&action=opensearch&format=json&search=' + keyword))
)
.flatMap(res => Observable.from(res.json()))
.filter(result => result && result[1])
/**
 * Task 1: Modify data for consumer to have array of result objects 
 * containing - Title, description and link to Wiki
*/
.map(result => result[1]);

userInputs$.subscribe(insertIntoDOM);


function insertIntoDOM(results) {
  var element = document.querySelector('#list');
  element.innerHTML = "";
  var fragment = document.createDocumentFragment();
  results.forEach(result => {
    var li = document.createElement('li');
    li.classList.add('mdl-list__item');
    li.textContent = result;
    fragment.appendChild(li);
  });
  element.appendChild(fragment);
}