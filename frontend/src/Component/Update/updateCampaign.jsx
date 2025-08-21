import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateCampaign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState({
        image: '',
        campaignTitle: '',
        campaignType: '',
        description: '',
        minimumDonationAmount: '',
        deadline: '',
        userEmail: '',
        userName: '',
    });

    const [isLoading, setIsLoading] = useState(true);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetch(`http://localhost:5000/updateCampaign/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign details');
                }
                return response.json();
            })
            .then((data) => {
                setCampaign({
                    image: data.image || '',
                    campaignTitle: data.campaignTitle || '',
                    campaignType: data.campaignType || '',
                    description: data.description || '',
                    minimumDonationAmount: data.minimumDonationAmount || '',
                    deadline: formatDate(data.deadline),
                    userEmail: data.userEmail || '',
                    userName: data.userName || '',
                });
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error('Failed to fetch campaign details.');
                setIsLoading(false);
            });
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/campaign/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaign),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update campaign');
                }
                toast.success('Campaign updated successfully!');
                navigate('/myCampaign');
            })
            .catch((error) => toast.error('Failed to update campaign.'));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6  dark:bg-gray-900 dark:text-white">
            <h2 className="text-3xl font-semibold text-center text-green-600">Update Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">Campaign Image</label>
                    <input
                        type="text"
                        name="image"
                        value={campaign.image}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">Campaign Title</label>
                    <input
                        type="text"
                        name="campaignTitle"
                        value={campaign.campaignTitle}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">Campaign Type</label>
                    <input
                        type="text"
                        name="campaignType"
                        value={campaign.campaignType}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={campaign.description}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">Minimum Donation Amount</label>
                    <input
                        type="number"
                        name="minimumDonationAmount"
                        value={campaign.minimumDonationAmount}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={campaign.deadline}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">User Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={campaign.userEmail}
                        readOnly
                        className="px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700">User Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={campaign.userName}
                        readOnly
                        className="px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Update Campaign
                </button>
            </form>
        </div>
    );
};

export default UpdateCampaign;
