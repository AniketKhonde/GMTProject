import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

function Onboarding3() {
    const [time, setTime] = useState('');
    const navigate = useNavigate();

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

    return (
        <div className="bg-[url('/burger.avif')] bg-cover bg-center h-screen flex flex-col ">
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full h-[44px] px-6">
                <div className="text-lg font-semibold text-white">{time}</div>
                <div className="flex items-center">
                    <img src="/network.svg" alt="Network" className="h-5 w-5 mx-1 filter-white" />
                    <img src="/wifi.svg" alt="Wi-Fi" className="h-5 w-5 mx-1 filter-white" />
                    <img src="/battery.svg" alt="Battery" className="h-5 w-5 mx-1 filter-white" />
                </div>
            </div>

            {/* Bottom Div */}
            <div className="mx-8 h-[400px] bg-[#FE8C00] rounded-[40px] flex items-center flex-col md:w-1/2 md:ml-[25%] se:mt-[180px] mt-96 s8:mt-80 ">


                <div className='flex flex-col'>
                    <div className='mx-4'>
                        <h1 className='text-white text-center font-semibold text-[32px] leading-[40px] mt-10'>
                            We Serve <br /> incomparable <br /> delicacies
                        </h1>
                    </div>
                    <div className='mt-4'>
                        <p className='text-white text-center'>All the best restorent with teir top <br /> menu waiting for you, they cant wait <br /> for your order!!</p>
                    </div>
                    <div className='flex w-10 mt-4  mx-16'>
                        <div className=' w-full text-center mt-auto flex justify-center mr-2'>
                            <p className='border-t-4 w-24 border-gray-400 rounded-md'></p>
                        </div>

                        <div className='w-full text-center mt-auto flex justify-center mr-2'>
                            <p className='border-t-4 w-24 border-gray-400 rounded-md'></p>
                        </div>

                        <div className='w-full text-center mt-auto flex justify-center'>
                            <p className='border-t-4 w-24 border-white rounded-md'></p>
                        </div>

                    </div>

                    <div className='flex justify-center' onClick={() => navigate('/Login')}>
                        <div className='w-16 h-16 rounded-full bg-white mt-10 mb-8 mx-20 flex items-center justify-center'>
                            <img src="arrow3.png" alt="" className='h-8 w-8' />
                        </div>
                    </div>

                </div>


            </div>
            {/* Last Div */}
            <div className='mb-2 w-full text-center mt-auto flex justify-center'>
                <p className='border-t-4 w-40 border-white rounded-md'></p>
            </div>
        </div>
    );
}

export default Onboarding3;
