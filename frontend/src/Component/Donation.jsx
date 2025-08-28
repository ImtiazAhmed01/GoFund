import React, { useEffect, useState } from "react";

const Donation = ({ user }) => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/donations/${user.email}`)
                .then((res) => res.json())
                .then((data) => setDonations(data));
        }
    }, [user]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Donations</h1>

            {donations.length === 0 ? (
                <p className="text-gray-500">You haven’t made any donations yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Campaign</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, idx) => (
                            <tr key={idx}>
                                <td className="border p-2">{donation.campaignTitle}</td>
                                <td className="border p-2">{donation.minimumDonationAmount}</td>
                                <td className="border p-2">
                                    {new Date(donation.donatedAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Donation;
