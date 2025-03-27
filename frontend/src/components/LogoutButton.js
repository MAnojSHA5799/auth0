import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../Profile.css"; // Import CSS file

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout()} className="logout-button">
      Log Out
    </button>
  );
};

export default LogoutButton;
