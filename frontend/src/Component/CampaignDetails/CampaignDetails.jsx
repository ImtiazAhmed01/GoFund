import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Provider/useAuth';

const CampaignDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:5000/campaign/${id}`)
            .then(res => res.json())
            .then(data => setCampaign(data))
            .catch(err => console.error('Error fetching campaign details:', err));
    }, [id, user, navigate]);

    const handleDonate = () => {
        if (user) {
            const donationData = {
                campaignId: campaign._id,
                userEmail: user.email,
                userName: user.displayName,
            };


            fetch('http://localhost:5000/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Donation successful', data);
                    alert('Thank you for your donation!');
                })
                .catch((error) => {
                    console.error('Error processing donation:', error);
                });
        }
    };

    if (!campaign) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center p-6  dark:bg-gray-900 dark:text-white">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={campaign.image}
                    alt={campaign.campaignTitle}
                    className="w-full h-60 object-cover"
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {campaign.campaignTitle}
                    </h2>
                    <p className="text-gray-600 text-lg mb-4">{campaign.description}</p>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 font-semibold">
                            Type: <span className="text-purple-600">{campaign.campaignType}</span>
                        </span>
                        <span className="text-gray-700 font-semibold">
                            Minimum Donation: ${campaign.minimumDonationAmount}
                        </span>
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-600">
                            <span className="font-semibold text-gray-800">Deadline:</span>{' '}
                            {new Date(campaign.deadline).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={handleDonate}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
