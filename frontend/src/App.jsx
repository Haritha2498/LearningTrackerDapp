import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom";
import SignupPage from './Pages/Signup';
import First from './Pages/First';
import LoginPage from './Pages/Login';

import AddCourse from './Pages/Addcourse';
import VerifyCertificate from './Pages/VerifyCertificate';
import Certificate from './Pages/Certificate';
import Home from './Pages/Home';
import Userdashboard from './Pages/Userdashboard';
import AdminDashboard from './Pages/Admindashboard';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/"></Route>
        <Route index element={<Home />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/user" element={<Userdashboard />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App