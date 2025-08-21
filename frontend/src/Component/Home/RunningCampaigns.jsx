import React, { useEffect, useState } from 'react';

const RunningCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/running-campaigns')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setCampaigns(data);
                } else {
                    throw new Error('Invalid data format received from the server.');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching campaigns:', err);
                setError('Failed to load campaigns. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading campaigns...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (campaigns.length === 0) {
        return <div>No campaigns found.</div>;
    }

    return (
        <div className="md:px-14 lg:px-32 py-4">
            <h1 className="text-2xl font-bold mb-6">Running Campaigns</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign._id}
                        className="card bg-white shadow-lg rounded-md overflow-hidden"
                    >
                        <img
                            src={campaign.image || '/placeholder-image.jpg'}
                            alt={campaign.campaignTitle || 'Campaign Image'}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">
                                {campaign.campaignTitle || 'Untitled Campaign'}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {campaign.description
                                    ? `${campaign.description.slice(0, 100)}...`
                                    : 'No description available.'}
                            </p>
                            <p className="text-sm mt-2">
                                <strong>Type:</strong>{' '}
                                {campaign.campaignType || 'Unknown'}
                            </p>
                            <p className="text-sm">
                                <strong>Min Donation:</strong> $
                                {campaign.minimumDonationAmount || 'N/A'}
                            </p>
                            <button className="mt-4 px-4 py-2  bg-purple-600 text-white rounded-md">
                                See More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RunningCampaigns;
