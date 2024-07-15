import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  // State variables for form inputs and UI state
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update the current time every second
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    const interval = setInterval(updateTime, 1000); // Update time every second
    updateTime(); // Initialize immediately
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!agreeTerms) {
      alert('You must agree to the terms and services.'); // Check if terms are agreed
      return;
    }

    // Create user object and store it in local storage
    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/Postlogin'); // Navigate to the post-login screen
  };

  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google using Firebase authentication
      const userCredential = await signInWithPopup(auth, googleProvider);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      navigate('/Postlogin'); // Navigate to the post-login screen
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // Toggle password visibility
  };

  return (
    <>
    <div className="flex flex-col items-center md:justify-center h-screen overflow-hidden md:overflow-scroll">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[44px] px-6">
        <div className="text-lg font-semibold">{time}</div> {/* Display current time */}
        <div className="flex items-center">
          <img src="/network.png" alt="Network" className="h-5 w-5 mx-1" />
          <img src="/wifi.png" alt="Wi-Fi" className="h-5 w-5 mx-1" />
          <img src="/battery.png" alt="Battery" className="h-5 w-5 mx-1" />
        </div>
      </div>

      <div className='md:shadow-md md:bg-gray-50 se:mt-12 s8:mt-16 mt-24 mx-6 md:p-8'>
        <div className='w-80'>
          <h1 className="font-bold se:text-2xl text-3xl">Create Your new <br /> Account.</h1>
          <p className='text-sm text-gray-400 mt-2'>Create an account to start looking for the food <br /> you like</p>
        </div>
        <div className=''>
          <form className="se:mt-2 mt-6" onSubmit={handleRegister}>
            <label className='text-gray-900 font-semibold'>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="border border-gray-300 se:p-1 p-3 mb-4 w-full rounded-lg mt-2"
              required
            />
            <label className='text-gray-900 font-semibold'>User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="border border-gray-300 se:p-1 p-3 mb-4 w-full rounded-lg mt-2"
              required
            />
            <label className='text-gray-900 font-semibold'>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-gray-300 se:p-1 p-3 se:mb-2 mb-4 w-full rounded-lg pr-10 mt-2"
                required
              />
              <img
                src={showPassword ? '/show.png' : '/hide.png'}
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
                className="absolute right-2 se:top-3 top-5 cursor-pointer h-6 w-6"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(prev => !prev)}
                className="mr-2 cursor-pointer transform scale-150 se:mb-2 mb-4 accent-yellow-600"
                required
              />
              <span className='text-gray-900 se:font-thin font-semibold'>
                I agree with <span className='text-[#FE8C00]'>Terms and Service</span> and <span className='text-[#FE8C00]'>Privacy <br /> Policy</span>
              </span>
            </div>

            <button type="submit" style={{ backgroundColor: '#FE8C00' }} className="text-white se:p-2 p-4 rounded-3xl w-full">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className='se:mt-2 se:mb-1 mt-8 mb-4 flex justify-center items-center'>
        <div className='border-t-2 w-24 mr-2 border-gray-300'></div>
        Or Sign up with
        <div className='border-t-2 w-24 ml-2 border-gray-300'></div>
      </div>
      <div className="flex justify-center ">
        <img
          src="/google.png"
          onClick={handleGoogleLogin}
          alt="Google"
          className="cursor-pointer h-10 w-10 se:mt-1 mt-4 transition-transform transform hover:scale-105 border rounded-full p-2"
        />
      </div>
      <Link to="/" className="text-blue-500 se:mt-1 mt-4 md:mb-12">
        <span className='text-black font-semibold'>Already have an account?</span> <span className='text-[#FE8C00] font-semibold'>Sign in</span>
      </Link>
    </div>
    
   </>
  );
};

export default Register;
