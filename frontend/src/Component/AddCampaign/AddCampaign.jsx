import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/authProvider';


const AddCampaign = () => {
    const [formData, setFormData] = useState({
        imageUrl: '',
        campaignTitle: '',
        campaignType: '',
        description: '',
        minimumDonationAmount: '',
        deadline: '',
        userEmail: '',
        userName: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading) {
            if (user) {
                setFormData((prevData) => ({
                    ...prevData,
                    userEmail: user.email,
                    userName: user.name || user.displayName,
                }));
            } else {
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch('http://localhost:5000/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Campaign Added!',
                    text: 'Your campaign has been added successfully.',
                });
                setIsSubmitting(false);
                navigate('/campaigns');
            })
            .catch((error) => {
                console.error('Error adding campaign:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please try again.',
                });
                setIsSubmitting(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="md:px-32  dark:bg-gray-900 dark:text-white">
            <h2 className="font-extrabold text-4xl my-6">Add New Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700">
                        Campaign Title
                    </label>
                    <input
                        type="text"
                        id="campaignTitle"
                        name="campaignTitle"
                        value={formData.campaignTitle}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700">
                        Campaign Type
                    </label>
                    <select
                        id="campaignType"
                        name="campaignType"
                        value={formData.campaignType}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    >
                        <option value="personal issue">Personal Issue</option>
                        <option value="startup">Startup</option>
                        <option value="business">Business</option>
                        <option value="creative ideas">Creative Ideas</option>
                        <option value="creative ideas">Community Issue</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="minimumDonationAmount" className="block text-sm font-medium text-gray-700">
                        Minimum Donation Amount
                    </label>
                    <input
                        type="number"
                        id="minimumDonationAmount"
                        name="minimumDonationAmount"
                        value={formData.minimumDonationAmount}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                        Deadline
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                        User Email
                    </label>
                    <input
                        type="text"
                        id="userEmail"
                        name="userEmail"
                        value={formData.userEmail}
                        readOnly
                        className="mt-1 p-2 w-full border rounded-md bg-gray-200"
                    />
                </div>

                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        readOnly
                        className="mt-1 p-2 w-full border rounded-md bg-gray-200"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        {isSubmitting ? 'Adding Campaign...' : 'Add Campaign'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCampaign;
