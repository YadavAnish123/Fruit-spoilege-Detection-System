//Internal Imports
import { useState } from "react";

// External Imports
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// pages
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Auth from "./pages/auth";
import MailHistory from "./pages/mailHistory";

function App() {
  const [admin, setAdmin] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateAdminPassword = (admin, password) => {
    setAdmin(admin);
    setPassword(password);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Auth
              admin={admin}
              setAdmin={setAdmin}
              password={password}
              setPassword={setPassword}
              loggedin={isLoggedIn}
              setLogin={setIsLoggedIn}
            />
          }
        />
        <Route path="home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="dashboard"
          element={<Dashboard isLoggedIn={isLoggedIn} />}
        />
        <Route path="users" element={<Users isLoggedIn={isLoggedIn} />} />
        <Route
          path="mail-history"
          element={<MailHistory isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="auth"
          element={
            <Auth
              admin={admin}
              setAdmin={setAdmin}
              password={password}
              setPassword={setPassword}
              loggedin={isLoggedIn}
              setLogin={setIsLoggedIn}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
