import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home/Home.jsx';
import Root from './Root.jsx';
import AuthProvider from './Component/Provider/authProvider.jsx';
import Register from './Component/Register/Register.jsx';
import Login from './Component/Login/Login.jsx';
import RunningCampaigns from './Component/Home/RunningCampaigns.jsx';
import AllCampaigns from './assets/AllCampaign/AllCampaigns.jsx';
import CampaignDetails from './Component/CampaignDetails/CampaignDetails.jsx';
import AddCampaign from './Component/AddCampaign/AddCampaign.jsx';
import MyCampaign from './Component/MyCampaign/MyCampaign.jsx';
import UpdateCampaign from './Component/Update/updateCampaign.jsx';
import PrivateRoute from './Component/PrivateRoute.jsx';
import Donation from './Donation.jsx';
// import DashboardLayout from './Component/Dashboard/DashboardLayout.jsx';
import User from './Component/Dashboard/User/User.jsx';
import AdminUsers from './Component/Dashboard/Admin/AdminUser.jsx';
import { ThemeProvider } from './Component/Provider/ThemeProvider.jsx';
import MyProfile from './Component/Dashboard/Myprofile.jsx';
// import AdminUsers from './Component/Dashboard/Admin/AdminUser.jsx';
import ApprovalList from './Component/Navbar/ApprovalList.jsx';
// import MyCampaign from './Component/MyCampaign/MyCampaign.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/running-campaigns', element: <RunningCampaigns /> },
      { path: '/campaigns', element: <AllCampaigns /> },
      { path: '/campaign/:id', element: <CampaignDetails /> },
      { path: '/addCampaign', element: <PrivateRoute><AddCampaign /></PrivateRoute> },
      { path: '/myCampaign', element: <PrivateRoute><MyCampaign /></PrivateRoute> },
      { path: '/updateCampaign/:id', element: <UpdateCampaign /> },
      { path: '/donation', element: <PrivateRoute><Donation /></PrivateRoute> }
    ]
  },
  {
    path: '/dashboard',
    element: <Root />,
    children: [
      { path: 'user', element: <User /> },
      { path: 'myprofile', element: <MyProfile /> },
      { path: 'admin', element: <AdminUsers /> },
      { path: 'wait-campaigns', element: <ApprovalList /> },
      { path: 'my-campaigns', element: <MyCampaign /> }
      // { path: 'all-users', element: <AllUsers /> }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
