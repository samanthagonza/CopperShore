import React, { useEffect, useState } from 'react';
import './Account.css'; // Import the CSS for styling

function Account() {
  const [user, setUser] = useState(null); // State to store user details

  // Initialize Google Sign-In when the component loads
  useEffect(() => {
    /* global google */
    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id: "121787712334-ofuoelj4rn4tmf9t6r2sj332jouobac8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    const handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: " + response.credential);
      const userObject = parseJwt(response.credential); // Parse JWT to get user info
      setUser(userObject); // Save user info to state
      console.log(userObject); // Log user details for debugging
    };

    // Helper function to decode JWT
    const parseJwt = (token) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    };

    // Load the Google API script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);
  }, []);

  // Sign-out function
  const signOut = () => {
    google.accounts.id.disableAutoSelect();
    setUser(null); // Clear user state
    alert("User signed out.");
  };

  return (
    <div className="account-container">
      {/* Header */}
      <h1 className="account-title">Account</h1>
      <p className="account-description">Manage your account details and preferences here.</p>

      {/* Sign-In Section */}
      <div className="account-actions">
        <h2 className="account-subtitle">Sign In / Sign Up</h2>
        <p>Sign in using your Google account to access your account information.</p>
        {!user ? (
          <div id="google-signin-button"></div> // Render Google Sign-In button
        ) : (
          <button className="sign-out-button" onClick={signOut}>
            Sign Out
          </button>
        )}
      </div>

      {/* Account Details */}
      {user && (
        <div className="account-details">
          <h2 className="account-subtitle">Your Account</h2>
          <p>
            Welcome, <strong>{user.name}</strong>! Here are your account details:
          </p>
          <div className="account-info">
            <p>Name: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
