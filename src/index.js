import style from "./css/main.css";

import { interval, fromEvent, merge, empty } from 'rxjs';
import { scan, mapTo, takeWhile, takeUntil, startWith, switchMap } from 'rxjs/operators';

// elms ref
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const start = document.getElementById('start');
const pause = document.getElementById('pause');

const COUNTDOWN_FROM = 10;

const startClick$ = fromEvent(start, 'click');
const pauseClick$ = fromEvent(pause, 'click');

const subscriber = (name) => {
    return {
        next: value => {
            countdown.innerHTML = value;
            if (!value) {
                message.innerHTML = 'Loftoff!'
            }
        },
        complete: () => console.log('complete', name)
    }
};

const counter$ = interval(1000);

merge(
    startClick$.pipe(mapTo(true)),
    pauseClick$.pipe(mapTo(false)),
).pipe(
    switchMap(shouldStart => shouldStart ?  counter$ : empty()),
    mapTo(-1),
    scan((accumulator, current) => accumulator + current, COUNTDOWN_FROM),
    takeWhile(value => value >= 0),
    startWith(COUNTDOWN_FROM)
).subscribe(subscriber('startClick'));