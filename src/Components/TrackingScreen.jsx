import React, { useEffect, useState } from 'react';
import AnalogClock from './AnalogClock';
import "../App.css";

const TrackingScreen = () => {
  const [speed, setSpeed] = useState(1);
  const [quote, setQuote] = useState('');
  const [shareableUrl, setShareableUrl] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': '3bqAGki5yvxN+sfdZ3QvKQ==i29gr0t7hPJnWCHI' }
      });
      const data = await response.json();
      const quote = data[0]?.quote || 'No quote available';
      const words = quote.split(' ');
      const trimmedQuote = words.length > 8
        ? words.slice(0, 8).join(' ') + '.' // Limit quote to 8 words
        : quote;
      setQuote(trimmedQuote); // Set the quote state
    };

    fetchQuote(); // Fetch a quote on component mount
    const interval = setInterval(fetchQuote, 5000); // Set interval to fetch a new quote
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`); // Set the current time
    };

    const interval = setInterval(updateTime, 1000); // Update time every second
    updateTime(); // Initialize immediately
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Set speed from URL parameter when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const speedParam = urlParams.get('speed');
    if (speedParam) {
      setSpeed(parseInt(speedParam, 10));
    }
  }, []);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?speed=${speed}`;
    setShareableUrl(url); // Set the shareable URL
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    alert('URL copied to clipboard!'); // Notify user of successful copy
  };

  return (
    <div className="bg-[url('/burger.avif')] bg-cover bg-center h-screen md:h-auto flex flex-col md:flex-row justify-center">
      <div className='bg-white mx-4 rounded-lg p-8 min-h-3/4 flex flex-col md:mt-8 md:mb-8'>
        {/* Top bar with time and network indicators */}
        <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[44px] px-6">
          <div className="text-lg font-semibold text-white">{time}</div> {/* Display current time */}
          <div className="flex items-center">
            <img src="/network.svg" alt="Network" className="h-5 w-5 mx-1 filter-white" />
            <img src="/wifi.svg" alt="Wi-Fi" className="h-5 w-5 mx-1 filter-white" />
            <img src="/battery.svg" alt="Battery" className="h-5 w-5 mx-1 filter-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">Tracking Screen</h1>
        <div className='mt-4 mb-4 border p-4 shadow-md rounded-md bg-slate-100'>
          <AnalogClock speed={speed} /> {/* Render AnalogClock component */}
        </div>
        
        {/* Slider to adjust speed */}
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
          className="slider my-5"
        />
        
        {/* Button to generate shareable URL */}
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate URL
        </button>

        {/* Display shareable URL and conditionally render copy button */}
        <div className='flex justify-center items-center border mt-4'>
          <p className="p-2 text-sm text-left font-bold">
            {shareableUrl}
          </p>
          {shareableUrl && (
            <button
              onClick={handleCopy}
              className="bg-green-500 text-white p-1 rounded"
            >
              Copy
            </button>
          )}
        </div>

        {/* Display the fetched quote */}
        <div className=' shadow-lg border rounded-md mt-3 mb-6'>
          <p className="mt-5 mb-4 text-center text-sm">{quote}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingScreen;
