import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApprovalList = () => {
    const [campaigns, setCampaigns] = useState([]);

    // Fetch campaigns from adminReview
    const fetchCampaigns = async () => {
        try {
            const res = await fetch("http://localhost:5000/adminreview");
            const data = await res.json();
            setCampaigns(data);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Approve campaign
    const handleApprove = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/adminreview/approve/${id}`, {
                method: "POST",
            });
            const data = await res.json();

            if (data.success) {
                Swal.fire("Approved!", "Campaign moved to active campaigns.", "success");
                fetchCampaigns(); // refresh list
            } else {
                Swal.fire("Error", data.message || "Approval failed", "error");
            }
        } catch (error) {
            console.error("Error approving:", error);
        }
    };

    // Delete campaign
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/adminreview/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                Swal.fire("Deleted!", "Campaign removed.", "success");
                fetchCampaigns();
            } else {
                Swal.fire("Error", data.message || "Delete failed", "error");
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Pending Campaign Approvals</h2>
            {campaigns.length === 0 ? (
                <p>No campaigns waiting for approval.</p>
            ) : (
                <div className="space-y-4">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign._id}
                            className="p-4 border rounded-md shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-semibold">{campaign.campaignTitle}</h3>
                                <p className="text-gray-600">{campaign.description}</p>
                                <p className="text-sm text-gray-500">
                                    By: {campaign.userName} ({campaign.userEmail})
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleApprove(campaign._id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDelete(campaign._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApprovalList;
