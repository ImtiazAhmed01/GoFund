import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen py-20 px-4 dark:bg-gray-900 mt-5 dark:text-white">
            <div className="container mx-auto max-w-4xl text-center space-y-6">
                <h1 className="text-4xl font-bold">About GoFund</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    GoFund is a dedicated crowdfunding platform built to empower individuals and communities.
                    We aim to bridge the gap between people who need help and those willing to offer support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                    <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                        <p>To provide a transparent, easy-to-use, and secure platform where anyone can raise funds for their most important causes.</p>
                    </div>
                    <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                        <p>We envision a world where a lack of financial resources does not hinder positive change, innovation, and community support.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
