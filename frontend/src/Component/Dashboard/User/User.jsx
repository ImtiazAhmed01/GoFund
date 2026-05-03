import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const User = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/dashboard-stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <div className="p-6">Loading dashboard...</div>;

    const mockTimeSeries = [
        { name: 'Week 1', donations: 120 },
        { name: 'Week 2', donations: 210 },
        { name: 'Week 3', donations: 180 },
        { name: 'Week 4', donations: 290 },
    ];

    return (
        <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat bg-base-200 dark:bg-gray-800 rounded-lg shadow">
                    <div className="stat-title dark:text-gray-300">Total Campaigns</div>
                    <div className="stat-value text-primary">{stats.cards.totalCampaigns}</div>
                </div>
                <div className="stat bg-base-200 dark:bg-gray-800 rounded-lg shadow">
                    <div className="stat-title dark:text-gray-300">Total Users</div>
                    <div className="stat-value text-secondary">{stats.cards.totalUsers}</div>
                </div>
                <div className="stat bg-base-200 dark:bg-gray-800 rounded-lg shadow">
                    <div className="stat-title dark:text-gray-300">Total Donations</div>
                    <div className="stat-value text-accent">{stats.cards.totalDonations}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-base-200 dark:bg-gray-800 p-4 rounded-lg shadow h-80">
                    <h3 className="text-xl mb-4 font-semibold text-center">Campaigns by Category</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie data={stats.charts.typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {stats.charts.typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-200 dark:bg-gray-800 p-4 rounded-lg shadow h-80">
                    <h3 className="text-xl mb-4 font-semibold text-center">Donation Trends</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={mockTimeSeries}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="donations" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-200 dark:bg-gray-800 p-4 rounded-lg shadow h-80 lg:col-span-2">
                    <h3 className="text-xl mb-4 font-semibold text-center">Category Distribution</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={stats.charts.typeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Recent Donations</h3>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="dark:text-gray-300">
                                <th>Donor</th>
                                <th>Campaign</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentDonations.map((d, i) => (
                                <tr key={i} className="hover">
                                    <td>{d.userName || 'Anonymous'}</td>
                                    <td>{d.campaignTitle}</td>
                                    <td>${d.amount || d.minimumDonationAmount || 0}</td>
                                    <td>{new Date(d.donatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {stats.recentDonations.length === 0 && (
                                <tr><td colSpan="4" className="text-center">No recent donations</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User;