import React, { useEffect, useState } from 'react';
import '../App.css';

const AnalogClock = ({ speed }) => {
  const [hrotation, setHrotation] = useState(0); // Rotation angle for the hour hand
  const [mrotation, setMrotation] = useState(0); // Rotation angle for the minute hand
  const [srotation, setSrotation] = useState(0); // Rotation angle for the second hand
  const [initialHrotation, setInitialHrotation] = useState(0); // Initial hour hand rotation
  const [elapsedSeconds, setElapsedSeconds] = useState(0); // Track elapsed seconds

  useEffect(() => {
    // Function to update clock hands' initial positions
    const updateClock = () => {
      const currentTime = new Date();
      const htime = currentTime.getHours();
      const mtime = currentTime.getMinutes();
      const stime = currentTime.getSeconds();

      const calculatedHrotation = 30 * htime + mtime / 2; // Calculate hour hand rotation
      setInitialHrotation(calculatedHrotation);
      setHrotation(calculatedHrotation); // Set initial hour hand rotation
      setMrotation(6 * mtime); // Set minute hand rotation
      setSrotation(6 * stime); // Set second hand rotation
    };

    // Initialize clock with the current time
    updateClock();

    // Set interval to update rotations
    const intervalId = setInterval(() => {
      setElapsedSeconds(prevElapsedSeconds => {
        const newElapsedSeconds = prevElapsedSeconds + 1; // Increment elapsed seconds

        // Update second hand rotation based on speed
        setSrotation(prevSrotation => prevSrotation - 6 * speed);

        // Update minute hand rotation every (60 / speed) seconds
        if (newElapsedSeconds % (60 / speed) === 0) {
          setMrotation(prevMrotation => prevMrotation - 6 * speed);
        }

        // Update hour hand rotation every (120 / speed) seconds
        if (newElapsedSeconds % (120 / speed) === 0) {
          setHrotation(prevHrotation => {
            const newHrotation = prevHrotation - speed;

            // Stop if hour rotation is 60 degrees less than initial
            if (newHrotation <= initialHrotation - 60) {
              clearInterval(intervalId);
              alert("120 minutes is finished, so we stopped");
            }

            return newHrotation;
          });
        }

        return newElapsedSeconds; // Return updated elapsed seconds
      });
    }, 1000 / speed); // Update every second divided by speed

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [speed, initialHrotation]);

  return (
    <div id="clockContainer" className="relative w-64 h-64">
      {/* Hour hand */}
      <div
        id="hour"
        className="absolute w-1 bg-black origin-bottom"
        style={{ height: '30%', top: '20%', left: '50%', transform: `rotate(${hrotation}deg)` }}
      ></div>
      {/* Minute hand */}
      <div
        id="minute"
        className="absolute w-1 bg-gray-700 origin-bottom"
        style={{ height: '40%', top: '10%', left: '50%', transform: `rotate(${mrotation}deg)` }}
      ></div>
      {/* Second hand */}
      <div
        id="second"
        className="absolute w-1 bg-red-500 origin-bottom"
        style={{ height: '45%', top: '5%', left: '50%', transform: `rotate(${srotation}deg)` }}
      ></div>
    </div>
  );
};

export default AnalogClock;
