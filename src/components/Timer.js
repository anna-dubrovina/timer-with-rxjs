import { useEffect, useState } from "react";
import { interval, Subscription } from "rxjs";
import { map } from "rxjs/operators";

const getTime = (v) => new Date(v * 1000).toISOString().substr(11, 8);

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isRestart, setIsRestart] = useState(false);
  const timerDial = getTime(seconds);

  useEffect(() => {
    let subscription = new Subscription();
    const secondsCounter = interval(1000).pipe(map((v) => seconds + v + 1));

    if (isCounting) {
      subscription = secondsCounter.subscribe((v) => setSeconds(v));
    }

    if (isRestart) {
      subscription.unsubscribe();
      setIsRestart(false);
    }

    if (isWaiting && !isCounting) {
      subscription.unsubscribe();
    }

    if (!isCounting && !isWaiting) {
      setSeconds(0);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [isCounting, isWaiting, isRestart]);

  const toggleStartTimerHandler = () => {
    setIsCounting((curState) => !curState);
    setIsWaiting(false);
  };

  const waitTimerHandler = () => {
    setIsWaiting(true);
    setIsCounting(false);
  };

  const resetTimerHandler = () => {
    setSeconds(0)
    setIsWaiting(false);
    setIsCounting(true);
    setIsRestart(true);
  };

  return (
    <section className="timer-wrapper">
      <h1> Simpe Timer </h1>
      <div className="timer-wrapper__dial">
        <span>{timerDial}</span>
      </div>
      <div className="timer-wrapper__buttons">
        <button onClick={toggleStartTimerHandler}>
          {isCounting && "Stop"}
          {!isCounting && !isWaiting && "Start"}
          {isWaiting && !isCounting && "Resume"}
        </button>
        <button onDoubleClick={waitTimerHandler}>Wait</button>
        <button onClick={resetTimerHandler}>Restart</button>
      </div>
    </section>
  );
};
export default Timer;
