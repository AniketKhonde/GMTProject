import React, { useEffect, useState } from 'react';
import '../App.css';

const AnalogClock = ({ speed }) => {
  const [hrotation, setHrotation] = useState(0);
  const [mrotation, setMrotation] = useState(0);
  const [srotation, setSrotation] = useState(0);
  const [initialHrotation, setInitialHrotation] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date();
      const htime = currentTime.getHours();
      const mtime = currentTime.getMinutes();
      const stime = currentTime.getSeconds();

      const calculatedHrotation = 30 * htime + mtime / 2;
      setInitialHrotation(calculatedHrotation);
      setHrotation(calculatedHrotation);
      setMrotation(6 * mtime);
      setSrotation(6 * stime);
    };

    // Initialize clock with the current time
    updateClock();

    // Set interval to update rotations
    const intervalId = setInterval(() => {
      setElapsedSeconds(prevElapsedSeconds => {
        const newElapsedSeconds = prevElapsedSeconds + 1;

        // Update rotations based on elapsed time
        setSrotation(prevSrotation => prevSrotation - 6 * speed);

        if (newElapsedSeconds % (60 / speed) === 0) {
          setMrotation(prevMrotation => prevMrotation - 6 * speed);
        }

        if (newElapsedSeconds % (120 / speed) === 0) {
          setHrotation(prevHrotation => {
            const newHrotation = prevHrotation - speed;

            // Stop if hrotation is 60 degrees less than initial
            if (newHrotation <= initialHrotation - 60) {
              clearInterval(intervalId);
              alert("120 minutes is finished, so we stoped")
            }

            return newHrotation;
          });
        }

        return newElapsedSeconds;
      });
    }, 1000 / speed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [speed, initialHrotation]);

  return (
    <div id="clockContainer" className="relative w-64 h-64">
      <div
        id="hour"
        className="absolute w-1 bg-black origin-bottom"
        style={{ height: '30%', top: '20%', left: '50%', transform: `rotate(${hrotation}deg)` }}
      ></div>
      <div
        id="minute"
        className="absolute w-1 bg-gray-700 origin-bottom"
        style={{ height: '40%', top: '10%', left: '50%', transform: `rotate(${mrotation}deg)` }}
      ></div>
      <div
        id="second"
        className="absolute w-1 bg-red-500 origin-bottom"
        style={{ height: '45%', top: '5%', left: '50%', transform: `rotate(${srotation}deg)` }}
      ></div>
    </div>
  );
};

export default AnalogClock;
