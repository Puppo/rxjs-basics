import style from "./css/main.css";

import { fromEvent, asyncScheduler } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';


function calculateScrollPercent(element) {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = element;

    return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar  = document.querySelector('.progress-bar');

const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
    throttleTime(200, asyncScheduler, {
        leading: false,
        trailing: true
    }),
    // percent progress
    map(({target}) => calculateScrollPercent(target.documentElement))
);


progress$.subscribe({
    next: percent => progressBar.style.width = `${percent}%`
});