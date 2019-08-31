import style from "./css/main.css";

import { interval, fromEvent } from 'rxjs';
import { scan, mapTo, filter, tap, takeWhile, takeUntil, startWith } from 'rxjs/operators';

// elms ref
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abort = document.getElementById('abort');

const COUNTDOWN_FROM = 10;

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

const counter$ = interval(1000).pipe(
    mapTo(-1),
    scan((accumulator, current) => accumulator + current, COUNTDOWN_FROM),
);

const counterFilter$ = counter$.pipe(
    filter(value => value >= 0) // --> stream not complete
);

const counterTakeWhile$ = counter$.pipe(
    takeWhile(value => value >= 0)
);

const abort$ = fromEvent(abort, 'click');
const counterTakeUntil$ = counter$.pipe(
    takeUntil(abort$),
    startWith(COUNTDOWN_FROM)
);

counterFilter$.subscribe(subscriber('counterFilter'));
counterTakeWhile$.subscribe(subscriber('counterTakeWhile'));
counterTakeUntil$.subscribe(subscriber('counterTakeUntil'));