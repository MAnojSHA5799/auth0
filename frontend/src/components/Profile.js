import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Profile.css"; // Import CSS file

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const sendTokenToBackend = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const userEmail = user?.email;
      const userName = user?.name;

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/callback`, {
        token,
        email: userEmail,
        name: userName,
      });

      toast.success("Token and email sent to backend. Check your inbox!");
    } catch (error) {
      toast.error("Error sending token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="user-card">
          {/* User Image */}
          <div className="user-card-img">
  {user?.picture ? (
    <img src={user.picture} alt={user.name} />
  ) : (
    <div className="user-initial">
      {user?.name?.charAt(0).toUpperCase()}
    </div>
  )}
</div>

          {/* User Info */}
          <div className="user-card-info">
            <h2>{user?.name}</h2>
            <p><span>Email:</span> {user?.email}</p>
            <p><span>Nickname:</span> {user?.nickname}</p>
            <p><span>Created At:</span> {new Date(user?.created_at).toLocaleString()}</p>
            <p><span>Email Verified:</span> {user?.email_verified? "Yes" : "No"}</p>
            <p><span>Updated At:</span> {new Date(user?.updated_at).toLocaleString()}</p>
            <Button onClick={sendTokenToBackend} variant="success" className="btn-custom mt-3" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Sending...
              </>
            ) : (
              "Send Token"
            )}
          </Button>
          </div>

          {/* Details List
          <ul className="profile-details">
            {Object.entries(user).map(([key, value], i) => {
              if (key === "picture" || key === "sub") return null; // Exclude fields

              let formattedKey = key.replace(/_/g, " ");
              formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);

              return (
                <li key={i}>
                  <strong>{formattedKey}:</strong> {String(value)}
                </li>
              );
            })}
          </ul> */}

          {/* Send Token Button */}
        

          <ToastContainer />
        </div>
      </div>
    )
  );
};

export default Profile;
