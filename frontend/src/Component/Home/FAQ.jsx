import React from 'react';

const FAQ = () => {
    return (
        <section className="py-12 mt-8">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4 max-w-3xl mx-auto">
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            How do I start a campaign?
                        </div>
                        <div className="collapse-content">
                            <p>Simply register, log in, and click on 'Add Campaign' to get started!</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Is there a fee for donating?
                        </div>
                        <div className="collapse-content">
                            <p>No, we do not charge any fee for donating. The full amount goes to the campaign, minus standard payment gateway fees.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Can I donate anonymously?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, you can choose to hide your identity when making a donation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
