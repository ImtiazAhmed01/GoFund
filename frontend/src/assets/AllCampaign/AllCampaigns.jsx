import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Importing a spinner from react-spinners

const AllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Tracks loading state
    const [sortOrder, setSortOrder] = useState('asc'); // Tracks the sort order (asc/desc)
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/campaigns')
            .then((res) => res.json())
            .then((data) => {
                setCampaigns(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching campaigns:', err);
                setIsLoading(false);
            });
    }, []);

    // Function to toggle sort order and sort the campaigns
    const handleSort = () => {
        const sortedCampaigns = [...campaigns].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.minimumDonationAmount - b.minimumDonationAmount;
            } else {
                return b.minimumDonationAmount - a.minimumDonationAmount;
            }
        });
        setCampaigns(sortedCampaigns);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    };

    const handleSeeMore = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
    };

    return (
        <div className="md:px-32 my-4  dark:bg-gray-900 dark:text-white">
            <h2 className="font-extrabold text-4xl my-6">All Campaigns</h2>

            {isLoading ? (
                // Display the spinner while loading
                <div className="flex justify-center items-center min-h-[50vh]">
                    <ClipLoader size={50} color="#4A90E2" loading={isLoading} />
                </div>
            ) : (
                // Render table once data is loaded
                <>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handleSort}
                            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition duration-300"
                        >
                            Sort by Minimum Donation ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Campaign Title</th>
                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                    <th className="border border-gray-300 px-4 py-2">Deadline</th>
                                    <th className="border border-gray-300 px-4 py-2">Minimum Donation Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign) => (
                                    <tr key={campaign._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2 font-semibold">
                                            {campaign.campaignTitle}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {campaign.description.length > 100
                                                ? `${campaign.description.slice(0, 100)}...`
                                                : campaign.description}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {new Date(campaign.deadline).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {campaign.minimumDonationAmount}$
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                onClick={() => handleSeeMore(campaign._id)}
                                            >
                                                See More
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllCampaigns;
