import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../../Appwrite/auth_serv";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      console.log(`Logout dispatched `);
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 
      hover:bg-blue-200 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
