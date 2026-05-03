import React from 'react';

const HowItWorks = () => {
    return (
        <section className="py-12 mt-8">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
                        <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                        <p className="text-gray-600 dark:text-gray-300">Sign up in seconds to start your journey.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
                        <h3 className="text-xl font-semibold mb-2">Find a Campaign</h3>
                        <p className="text-gray-600 dark:text-gray-300">Browse through various campaigns needing your help.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
                        <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
                        <p className="text-gray-600 dark:text-gray-300">Donate securely and see the difference you make.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
