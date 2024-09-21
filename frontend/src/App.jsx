import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom";
import SignupPage from './Pages/Signup';
import First from './Pages/First';
import LoginPage from './Pages/Login';
import EducatorDashboard from './Pages/Educatordashboard';
import AddCourse from './Pages/Addcourse';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/"></Route>
        <Route index element={<First />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/educatordashboard" element={<EducatorDashboard />} />
        <Route path="/addcourse" element={<AddCourse />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App