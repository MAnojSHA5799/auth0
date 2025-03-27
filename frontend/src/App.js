import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css';
import './index.css';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  return (
    <main className="column">
      <h1>Auth0 Login System</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          {!isAuthenticated && <LoginButton />} {/* Show login button if user is NOT authenticated */}
          {isAuthenticated && <LogoutButton />} {/* Show logout button only if user is authenticated */}
          {isAuthenticated && <Profile />} {/* Show profile only after login */}
        </>
      )}
    </main>
  );
}

export default App;
