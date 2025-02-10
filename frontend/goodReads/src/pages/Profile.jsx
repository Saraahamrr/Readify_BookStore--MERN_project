import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";
import Loader from "../components/Loader/Loader";
export default function Profile() {
const [profile,setProfile] = useState();
const [columnClass, setColumnClass] = useState("col-12 col-5 col-md-5");

  useEffect(() => {
    const fetch = async () => {
      axios.defaults.withCredentials = true;

      const response = await axios.get("http://localhost:3000/api/user-info"
      );
      setProfile(response.data);
      

    }
    fetch();
    const handleResize = () => {
      if (window.innerWidth < 1557) {
        setColumnClass("col-12 col-5 col-md-5");
      } else {
        setColumnClass("col-lg-3");
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return <div className="px-2 px-md-5 d-flex flex-column flex-md-row min-vh-100 py-4  ">
   {profile? <>
      <div className={`${columnClass} h-75 my-4 d-flex justify-content-center`}>
        <Sidebar data={profile} />
      </div>
      <div className="col-12 col-7 col-md-7 col-lg-9 my-4 flex-grow-1">
      <Outlet />
      </div>
    </>:<div className="w-100 h-100 d-flex align-items-center justify-content-center">
    <Loader/>
      </div>}
  </div>;
}
