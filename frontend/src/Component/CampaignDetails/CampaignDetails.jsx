// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import useAuth from '../Provider/useAuth';

// const CampaignDetails = () => {
//     const { id } = useParams();
//     const { user } = useAuth();
//     const [campaign, setCampaign] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }

//         fetch(`http://localhost:5000/campaign/${id}`)
//             .then(res => res.json())
//             .then(data => setCampaign(data))
//             .catch(err => console.error('Error fetching campaign details:', err));
//     }, [id, user, navigate]);

//     const handleDonate = () => {
//         if (user) {
//             const donationData = {
//                 campaignId: campaign._id,
//                 userEmail: user.email,
//                 userName: user.displayName,
//             };


//             fetch('http://localhost:5000/donate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(donationData),
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     console.log('Donation successful', data);
//                     alert('Thank you for your donation!');
//                 })
//                 .catch((error) => {
//                     console.error('Error processing donation:', error);
//                 });
//         }
//     };

//     if (!campaign) return <div>Loading...</div>;

//     return (
//         <div className="min-h-screen flex items-center justify-center p-6  dark:bg-gray-900 dark:text-white">
//             <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
//                 <img
//                     src={campaign.image}
//                     alt={campaign.campaignTitle}
//                     className="w-full h-60 object-cover"
//                 />
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                         {campaign.campaignTitle}
//                     </h2>
//                     <p className="text-gray-600 text-lg mb-4">{campaign.description}</p>
//                     <div className="flex justify-between items-center mb-4">
//                         <span className="text-gray-700 font-semibold">
//                             Type: <span className="text-purple-600">{campaign.campaignType}</span>
//                         </span>
//                         <span className="text-gray-700 font-semibold">
//                             Minimum Donation: ${campaign.minimumDonationAmount}
//                         </span>
//                     </div>
//                     <div className="mb-6">
//                         <p className="text-gray-600">
//                             <span className="font-semibold text-gray-800">Deadline:</span>{' '}
//                             {new Date(campaign.deadline).toLocaleDateString()}
//                         </p>
//                     </div>
//                     <button
//                         onClick={handleDonate}
//                         className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
//                     >
//                         Donate Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CampaignDetails;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Provider/useAuth';
import Swal from 'sweetalert2';

const CampaignDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const [donationAmount, setDonationAmount] = useState(0);
    const [isDonating, setIsDonating] = useState(false);
    const [hasDonated, setHasDonated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetch(`http://localhost:5000/campaign/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCampaign(data);
                if (data?.minimumDonationAmount) {
                    setDonationAmount(Number(data.minimumDonationAmount));
                }
            })
            .catch((err) => console.error('Error fetching campaign details:', err));
    }, [id, user, navigate]);

    useEffect(() => {
        if (user?.email && id) {
            fetch(`http://localhost:5000/donated/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    const donatedIds = (data || []).map((d) =>
                        (d?.campaignId?._id || d?.campaignId)?.toString()
                    );
                    if (donatedIds.includes(id)) setHasDonated(true);
                })
                .catch((err) => console.error('Error fetching donations:', err));
        }
    }, [id, user?.email]);

    const handleDonate = async () => {
        if (!user) {
            Swal.fire({
                title: 'Login required',
                text: 'Please log in to donate.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }
        if (!campaign) return;

        const min = Number(campaign.minimumDonationAmount || 0);
        const amt = Number(donationAmount || 0);
        if (isNaN(amt) || amt < min) {
            Swal.fire({
                title: 'Invalid amount',
                text: `Please enter at least $${min}.`,
                icon: 'info',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            setIsDonating(true);

            const donationData = {
                campaignId: campaign._id,
                userEmail: user.email,
                userName: user.displayName,
                amount: amt,
                campaignTitle: campaign.campaignTitle,
                image: campaign.image,
                campaignType: campaign.campaignType,
                minimumDonationAmount: campaign.minimumDonationAmount,
                deadline: campaign.deadline,
                donatedAt: new Date(),
            };

            const res = await fetch('http://localhost:5000/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData),
            });

            if (!res.ok) {
                throw new Error('Failed to donate');
            }

            await Swal.fire({
                title: '🎉 Thank you!',
                text: 'Your donation has been received successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#9538E2',
            });

            setHasDonated(true);
        } catch (error) {
            console.error('Error processing donation:', error);
            Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong while processing your donation.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            setIsDonating(false);
        }
    };

    if (!campaign) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 dark:bg-gray-900 dark:text-white">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
                <img
                    src={campaign.image}
                    alt={campaign.campaignTitle}
                    className="w-full h-60 object-cover"
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
                        {campaign.campaignTitle}
                    </h2>
                    <p className="text-gray-600 text-lg mb-4 dark:text-gray-300">
                        {campaign.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 font-semibold dark:text-gray-300">
                            Type: <span className="text-purple-600">{campaign.campaignType}</span>
                        </span>
                        <span className="text-gray-700 font-semibold dark:text-gray-300">
                            Minimum Donation: ${campaign.minimumDonationAmount}
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-semibold text-gray-800 dark:text-white">Deadline:</span>{' '}
                            {new Date(campaign.deadline).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Donation amount input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Enter Donation Amount
                        </label>
                        <input
                            type="number"
                            min={campaign.minimumDonationAmount}
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <button
                        onClick={handleDonate}
                        disabled={isDonating || hasDonated}
                        className={`w-full py-3 rounded-lg transition duration-300 ${isDonating || hasDonated
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                    >
                        {hasDonated ? 'Already Donated' : isDonating ? 'Processing...' : 'Donate Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
