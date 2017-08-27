import '../css/map.css';
import { Observable } from "rxjs";
import { DOM } from "rx-dom";


var map = L.map('map').setView([32.758631, -117.239602], 9);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = "http://api.eventful.com/json/events/search?app_key=WJXrJHfPb8NZzXBn&location=San+Diego";

const fetchSubscription = Observable
.from(fetch(PROXY_URL + API_URL))
.flatMap(res => Observable.from(res.json()) )
/**
 * Task 1: Create Stream of "Moving Map" actions to fetch related events and display it
*/
/**
 * Task 2: Create updates in "Real Time"
*/
.flatMap(res => Observable.from(res.events.event))
.subscribe((event) => {
  L.circle([event.latitude, event.longitude], 5000).addTo(map);
})

/**
 * Task 3: Create Stream of "Hovering to specific Event" actions to display event's details
*/


/**
 * Task 4: Create a dashboard for adding new Events and diplaying brief list of events
*/