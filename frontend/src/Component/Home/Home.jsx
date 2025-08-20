import React, { useState } from 'react';
import slider1Image from '../../assets/imgslide/fundraising-charity-donation-illustration-with-volunteers-putting-coin-money-donate-box_2175-19132.avif'
import slider2Image from '../../assets/imgslide/Family-Giving-689x450.jpg'
import slider3Image from '../../assets/imgslide/istockphoto-1353332258-612x612.jpg'
import RunningCampaigns from './RunningCampaigns';
import Welcomemsg from './Welcomemsg';
import Feature from './Feature';


const Home = () => {
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleTheme = () => {
    //     setDarkMode(!darkMode);
    // };
    return (
        <div className=' dark:bg-gray-900 dark:text-white'>
            <div className='md:px-14 lg:px-32 py-4'>
                {/* <div>
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"}`}
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div> */}
                {/* Welcome message */}
                <Welcomemsg></Welcomemsg>
                {/* Slider Section */}
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={slider1Image}
                            className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Support Communities in Need</h2>
                            <p>Your contributions can bring hope and transform lives.</p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src={slider2Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Every Contribution Counts</h2>
                            <p>Join us in creating a brighter future for underprivileged communities.</p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src={slider3Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Be the Change You Wish to See</h2>
                            <p>Your donations make a real difference in the lives of many.</p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
                {/*Running Campaign  */}
                <RunningCampaigns></RunningCampaigns>
                {/* Animation feature added */}
                <Feature></Feature>

            </div>
        </div>
    );
};

export default Home;