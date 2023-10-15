import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./stopWatch.css";

interface ILap {
  miliseconds: number;
  seconds: number;
  minutes: number;
}

export const StopWatch = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [miliseconds, setMiliseconds] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [lap, setLap] = useState<boolean>(false);
  const [lapTiming, setLapTiming] = useState<ILap[]>([]);

  // const handleStart = () => {
  //   setStart(true);
  // };

  // const handleStop = () => {
  //   setStart(false);
  // };

  const handleReset = () => {
    setStart(false);
    setLap(false);
    setMiliseconds(0);
    setSeconds(0);
    setMinutes(0);
  };

  const handleLap = () => {
    setLap(true);
    setLapTiming([
      ...lapTiming,
      { miliseconds: miliseconds, seconds: seconds, minutes: minutes },
    ]);
  };

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setMiliseconds((miliseconds) => {
          if (miliseconds >= 99) {
            setSeconds((seconds) => {
              if (seconds >= 59) {
                setMinutes((prev) => prev + 1);
                // setMinutes(minutes+1);
                return 0;
              } else {
                return seconds + 1;
              }
            });
            return 0;
          } else {
            return miliseconds + 1;
          }
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [start]);

  return (
    <div>
      <Typography className="header_text" variant="h5">
        Stop Watch
      </Typography>
      <div className="block" style={{ marginTop: "20px" }}>
        {minutes <= 9 ? <span>0{minutes}:</span> : <span>{minutes}:</span>}
        {seconds <= 9 ? <span>0{seconds}:</span> : <span>{seconds}:</span>}
        {miliseconds <= 9 ? (
          <span>0{miliseconds}</span>
        ) : (
          <span>{miliseconds}</span>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
        <Button
          variant="contained"
          className="animated-border-button"
          style={{
            cursor: start ? "not-allowed" : "pointer",
            backgroundColor: "green",
          }}
          onClick={() => {
            setStart(true);
          }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="error"
          className="animated-border-button"
          onClick={() => {
            setStart(false);
          }}
        >
          Pause
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="animated-border-button"
          onClick={handleLap}
        >
          Lap
        </Button>
        <Button
          variant="contained"
          className="animated-border-button"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      {!start && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "30px",
            fontSize: "25px",
          }}
        >
          <Typography fontSize={"25px"}>Pause Time:- </Typography>
          <div>
            {minutes <= 9 ? <span>0{minutes}:</span> : <span>{minutes}:</span>}
            {seconds <= 9 ? <span>0{seconds}:</span> : <span>{seconds}:</span>}
            {miliseconds <= 9 ? (
              <span>0{miliseconds}</span>
            ) : (
              <span>{miliseconds}</span>
            )}
          </div>
        </div>
      )}

      {lap && (
        <div
          style={{
            marginTop: "30px",
            fontSize: "25px",
          }}
        >
          <Typography fontSize="25px" borderBottom={"1px solid black"}>
            Lap Time
          </Typography>

          {lapTiming.map((i, index) => (
            <div key={index}>
              <span>{`Lap ${index + 1}: `}</span>
              <span>
                {i.minutes <= 9 ? (
                  <span>0{i.minutes}:</span>
                ) : (
                  <span>{i.minutes}:</span>
                )}
                {i.seconds <= 9 ? (
                  <span>0{i.seconds}:</span>
                ) : (
                  <span>{i.seconds}:</span>
                )}
                {i.miliseconds <= 9 ? (
                  <span>0{i.miliseconds}</span>
                ) : (
                  <span>{i.miliseconds}</span>
                )}
              </span>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
