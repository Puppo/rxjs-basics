import style from "./css/main.css";

import { fromEvent, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { takeUntil, mergeMapTo, finalize, tap, switchMap, switchMapTo, pluck, exhaustMap } from 'rxjs/operators';


// elems
const  startButton = document.getElementById('start');
const  stopButton = document.getElementById('stop');
const  pollingStatus = document.getElementById('polling-status');
const  dogImg = document.getElementById('dog');

// streams
const startClick$ = fromEvent(startButton, 'click');

const stopClick$ = fromEvent(stopButton, 'click');

startClick$.pipe(
    exhaustMap(() => timer(0, 5000).pipe(
        tap(() => pollingStatus.innerHTML = 'Active'),
        switchMapTo(
            ajax.getJSON('https://random.dog/woof.json').pipe(
                pluck('url')
            )
        ),
        takeUntil(stopClick$),
        finalize(() => pollingStatus.innerHTML = 'Stopped'),
        )
    )
)
.subscribe({
    next: url => dogImg.src = url
})