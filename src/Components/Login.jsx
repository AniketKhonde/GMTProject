import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // State variables for email, password, password visibility, current time, and navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Function to update the current time
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

    const handleLogin = async (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
        
        // Check if stored user matches input credentials
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            navigate('/Postlogin'); // Navigate to Postlogin if successful
        } else {
            alert("Invalid email or password, please register!"); // Alert on failure
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider); // Google sign-in
            localStorage.setItem('user', JSON.stringify(userCredential.user)); // Store user in localStorage
            navigate('/Postlogin'); // Navigate to Postlogin
        } catch (error) {
            console.error(error); // Log any errors
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState); // Toggle password visibility
    };

    return (
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

            <div className='md:shadow-md md:bg-gray-50 md:p-8 se:mt-12 mt-24 mx-6'>
                <div className='w-80'>
                    <h1 className="font-bold text-3xl">Login to Your <br /> Account.</h1>
                    <p className='text-sm'>Please sign in to your account</p>
                </div>
                <div>
                    <form className="mt-6" onSubmit={handleLogin}>
                        <label className='text-gray-900 font-semibold'>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            className="border border-gray-300 p-3 mb-4 w-full rounded-lg mt-2"
                            required
                        />
                        <label className='text-gray-900 font-semibold'>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="border border-gray-300 p-3 mb-4 w-full rounded-lg pr-10 mt-2"
                                required
                            />
                            <img
                                src={showPassword ? '/show.png' : '/hide.png'}
                                alt="Toggle Password Visibility"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-5 cursor-pointer h-6 w-6"
                            />
                        </div>
                        <p className='text-end pl-2 text-[#FE8C00] mb-4'>Forgot password?</p>
                        <button type="submit" style={{ backgroundColor: '#FE8C00' }} className="text-white p-4 rounded-3xl w-full">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            <div className='mt-8 mb-4 flex justify-center items-center'>
                <div className='border-t-2 w-24 mr-2 border-gray-300'></div>
                Or Sign in with
                <div className='border-t-2 w-24 ml-2 border-gray-300'></div>
            </div>
            <div className="flex justify-center">
                <img
                    src="/google.png"
                    onClick={handleGoogleLogin}
                    alt="Google"
                    className="cursor-pointer h-10 w-10 mt-4 transition-transform transform hover:scale-105 border rounded-full p-2"
                />
            </div>
            <Link to="/Register" className="text-blue-500 mt-4 md:mb-12">
                <span className='text-black font-semibold'>Don't have an account?</span> <span className='text-[#FE8C00] font-semibold'>Register</span>
            </Link>

              
            <div className="absolute bottom-1 z-50  text-center  ">
                <div className='border-t-4 w-40 border-black rounded-full'></div>
            </div>
        </div>
    );
};

export default Login;
