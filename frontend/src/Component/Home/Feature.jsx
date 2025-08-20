import Lottie from 'lottie-react';
import React from 'react';
import featureAnimation from './../Animation - 1735844390852.json';


const Feature = () => {
    return (
        <div>
            <section className="py-20 bg-cyan-100">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <Lottie animationData={featureAnimation} loop={true} />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-gray-700 text-lg mb-4">
                            We bring together cutting-edge technology and a passion for impact. 
                            From creating meaningful campaigns to engaging with supporters, 
                            we provide everything you need to succeed.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Seamless campaign creation</li>
                            <li>Real-time analytics</li>
                            <li>Secure donations</li>
                            <li>Dedicated support</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Feature;