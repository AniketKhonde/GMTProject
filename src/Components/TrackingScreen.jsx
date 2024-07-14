import React, { useEffect, useState } from 'react';
import AnalogClock from './AnalogClock';
import "../App.css"

const TrackingScreen = () => {
  const [speed, setSpeed] = useState(1);
  const [quote, setQuote] = useState('');
  const [shareableUrl, setShareableUrl] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      const words = data.content.split(' ');
      const trimmedQuote = words.length > 8
        ? words.slice(0, 8).join(' ') + '.'
        : data.content;
      setQuote(trimmedQuote);
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    const url = `${window.location.origin}/?speed=${speed}`;
    setShareableUrl(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="bg-[url('/burger.avif')] bg-cover bg-center h-screen md:h-auto flex flex-col md:flex-row justify-center ">
      <div className='bg-white mx-4  rounded-lg p-8 min-h-3/4 flex flex-col md:mt-8 md:mb-8'>
        <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[44px] px-6">
          <div className="text-lg font-semibold text-white">{time}</div>
          <div className="flex items-center">
            <img src="/network.svg" alt="Network" className="h-5 w-5 mx-1 filter-white" />
            <img src="/wifi.svg" alt="Wi-Fi" className="h-5 w-5 mx-1 filter-white" />
            <img src="/battery.svg" alt="Battery" className="h-5 w-5 mx-1 filter-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">Tracking Screen</h1>
        <div className='mt-4 mb-4 border p-4 shadow-md rounded-md bg-slate-100'>
          <AnalogClock speed={speed} />
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="slider my-5"
        />
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate URL
        </button>

        <div className='flex justify-center items-center border mt-4'>
          <p className="p-2 ">
            <strong>{shareableUrl}</strong>
          </p>
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white p-2 rounded"
            disabled={!shareableUrl} // Disable if there's no URL
          >
            Copy
          </button>

        </div>

        <div className='mx-4 shadow-lg border rounded-md mt-6 mb-6 p-2'>
          <p className="mt-5 mb-5 text-center">{quote}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingScreen;
