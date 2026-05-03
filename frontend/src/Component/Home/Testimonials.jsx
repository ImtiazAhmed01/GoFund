import React from 'react';

const Testimonials = () => {
    return (
        <section className="py-12 bg-base-200 dark:bg-gray-800 rounded-lg shadow-sm mt-8">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">What People Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-base-100 p-6 rounded shadow">
                        <p className="italic">"GoFund helped us rebuild our local library. Amazing support!"</p>
                        <h4 className="font-bold mt-4">- Jane Doe</h4>
                    </div>
                    <div className="bg-base-100 p-6 rounded shadow">
                        <p className="italic">"A trustworthy platform to support real causes and see impact."</p>
                        <h4 className="font-bold mt-4">- John Smith</h4>
                    </div>
                    <div className="bg-base-100 p-6 rounded shadow">
                        <p className="italic">"Very easy to use, and transparent with how funds are managed."</p>
                        <h4 className="font-bold mt-4">- Emily Clark</h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
