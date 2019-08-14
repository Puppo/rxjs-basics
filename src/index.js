import style from "./css/main.css";

import { interval } from 'rxjs';
import { scan, mapTo, filter, tap, takeWhile } from 'rxjs/operators';

// elms ref
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');


const counter$ = interval(1000).pipe(
    mapTo(-1),
    scan((accumulator, current) => accumulator + current, 10),
    tap({
        next: console.log
    }),
    // filter(value => value >= 0) // --> stream not complete
    takeWhile(value => value >= 0)
);

counter$.subscribe({
    next: value => {
        countdown.innerHTML = value;
        if (!value) {
            message.innerHTML = 'Loftoff!'
        }
    },
    complete: () => console.log('complete')
});