import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { RootState } from "../store";
import { FaUserAlt } from "react-icons/fa";

const Profile = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "/api/v1/get-user-info",
          { headers }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>;
  }

  return (
    <div className="bg-purple-400 px-4 md:px-12 flex flex-col md:flex-row h-auto py-8">
      {isLoggedIn && profileData && (
        <>
          <div className="w-1/6">
            <Sidebar profileData={profileData} />
          </div>
          <div className="w-5/6">
            <h1 className="text-2xl text-pink-100 flex items-center mb-4">
              <FaUserAlt className="mr-2" /> Profil
            </h1>
            <Outlet context={profileData} />
          </div>
        </>
      )}
      {!isLoggedIn && <p>Kullanıcı giriş yapmamış.</p>}
    </div>
  );
};

export default Profile;
