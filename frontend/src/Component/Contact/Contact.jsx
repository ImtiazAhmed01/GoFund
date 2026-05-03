import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/contact', formData);
            if (res.status === 201) {
                toast.success('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            toast.error('Failed to send message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 dark:bg-gray-900 mt-5 dark:text-white flex justify-center items-center">
            <ToastContainer transition={Bounce} />
            <div className="w-full max-w-lg bg-base-200 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text dark:text-gray-300">Name</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input input-bordered" placeholder="Your Name" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text dark:text-gray-300">Email</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input input-bordered" placeholder="Your Email" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text dark:text-gray-300">Message</span></label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required className="textarea textarea-bordered h-24" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
