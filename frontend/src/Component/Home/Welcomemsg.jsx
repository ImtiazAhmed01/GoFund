import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Welcomemsg = () => {
    return (
        <div>
            <section className="bg-orange-600 text-yellow-300 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
                <h2 className="text-2xl">
                    <Typewriter
                        words={[
                            'Explore Campaigns',
                            'Make a Difference',
                            'Start Contributing Today!',
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h2>
            </section>


        </div>
    );
};

export default Welcomemsg;