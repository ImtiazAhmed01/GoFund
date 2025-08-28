import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/authProvider';
import { useNavigate } from 'react-router-dom';

const MyCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const userEmail = user?.email;

    useEffect(() => {
        if (userEmail) {
            fetch(`http://localhost:5000/myCampaign?userEmail=${userEmail}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch campaigns');
                    }
                    return response.json();
                })
                .then((data) => setCampaigns(data))
                .catch((error) => console.error('Error fetching campaigns:', error));
        }
    }, [userEmail]);

    const handleUpdate = (campaignId) => {
        navigate(`/updateCampaign/${campaignId}`);
    };

    const handleDelete = (campaignId) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            fetch(`http://localhost:5000/campaigns/${campaignId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete campaign');
                    }
                    setCampaigns((prev) => prev.filter((c) => c._id !== campaignId));
                })
                .catch((error) => console.error('Error deleting campaign:', error));
        }
    };

    return (
        <div className="my-campaigns  dark:bg-gray-900 dark:text-white p-6">
            <h2 className="text-2xl font-bold mb-6">My Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign._id}
                        className="card shadow-lg rounded-md overflow-hidden"
                    >
                        <img
                            src={campaign.imageUrl || '/placeholder-image.jpg'}
                            alt={campaign.campaignTitle || 'Campaign Image'}
                            className="w-full h-40 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-semibold">
                                {campaign.campaignTitle || 'Untitled Campaign'}
                            </h2>
                            <p className=" mt-2">
                                {campaign.description
                                    ? `${campaign.description.slice(0, 100)}...`
                                    : 'No description available.'}
                            </p>
                            <p className="text-sm mt-2">
                                <strong>Type:</strong> {campaign.campaignType || 'Unknown'}
                            </p>
                            <p className="text-sm">
                                <strong>Min Donation:</strong> $
                                {campaign.minimumDonationAmount || 'N/A'}
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleUpdate(campaign._id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(campaign._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCampaign;
