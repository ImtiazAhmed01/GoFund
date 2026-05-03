import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-12 mt-8 bg-blue-600 text-white rounded-lg shadow-sm">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-6">Subscribe to our newsletter to receive the latest updates on campaigns.</p>
                <div className="flex justify-center max-w-md mx-auto">
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full text-black rounded-r-none" />
                    <button className="btn btn-neutral rounded-l-none">Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
