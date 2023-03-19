import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CoursesPage from "./components/pages/coursesPage/CoursesPage";
import CoursePage from "./components/pages/coursePage/CoursePage";
import Layout from "./components/utils/layout/Layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<CoursesPage />}/>
        <Route path="course/:courseId" element={<CoursePage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        autoClose={3000}
        hideProgressBar
        position="top-center"
        style={{borderRadius: '10px'}}
      />
    </>
  );
}

export default Router
