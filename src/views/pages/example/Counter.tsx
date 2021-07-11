import { FC, useState } from "react";

import { useAppSelector, useAppDispatch } from "services/hooks/useApp";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "data/slices/counter";

import styles from "./Counter.module.css";

const Counter: FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState<string>("2");
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          aria-label="Decrement value"
          className={styles.button}
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          aria-label="Increment value"
          className={styles.button}
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          value={incrementAmount}
          aria-label="Set increment amount"
          className={styles.textbox}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
};

export default Counter;
