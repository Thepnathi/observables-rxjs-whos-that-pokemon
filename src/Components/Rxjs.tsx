import * as React from "react";

import { from, Observable } from "rxjs";
import { map, filter, delay, mergeMap } from "rxjs/operators";

import useObservable from "../Hooks/useObservable";

const numsObservable = from([1, 2, 3, 4, 5]);
const squareNums = numsObservable.pipe(
  filter((val) => val > 2),
  mergeMap((val) => from([val]).pipe(delay(1000 * val))),
  map((val) => val * val)
);

export default function Rxjs() {
  const [currNum, setCurrNum] = React.useState(0);

  useObservable(squareNums, setCurrNum);

  return (
    <div>
      <h1>RxJS is library for reactive programming using Observables</h1>
      <p>Easier to compose async or callback-based code.</p>
      <p>
        ReactiveX combines the Observable pattern with iterator pattern and
        functional programming with collections to help deal with managing
        sequences.
      </p>

      <h3>Current Number: {currNum}</h3>
    </div>
  );
}
