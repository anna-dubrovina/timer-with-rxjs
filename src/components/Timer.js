const Timer = () => {
  const hours = "01";
  const minutes = "20";
  const seconds = "33";

  const waitTimerHandler = () => console.log("test");

  return (
    <section className="timer-wrapper">
      <h1> Simpe Timer </h1>
      <div className="timer-wrapper__dial">
        <span>{`${hours}:${minutes}:${seconds}`}</span>
      </div>
      <div className="timer-wrapper__buttons">
        <button>Start / Stop</button>
        <button onDoubleClick={waitTimerHandler}>Wait</button>
        <button>Reset</button>
      </div>
    </section>
  );
};
export default Timer;
