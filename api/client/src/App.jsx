import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";
import { Toaster } from "react-hot-toast";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register/Register";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import Request from "./services/Request";
import { loginRequest, loginSuccess, loginFailure } from "./context/Actions";

function App() {
  const { user, dispatch } = useContext(Context);
  const isLoggedIn = user && true;
  // whether getLoggedInUser was called once, whether sucessful or failed
  const [hasFetchedUserOnce, setHasFetchedUserOnce] = useState(false);

  useEffect(() => {
    const getLoggedInUser = async () => {
      dispatch(loginRequest());
      try {
        const result = await Request.get("/auth/session");
        if (result.success && result.user) {
          dispatch(loginSuccess(result.user));
        } else {
          dispatch(loginFailure());
        }
      } catch (err) {
        dispatch(loginFailure());
      }
      setHasFetchedUserOnce(true);
    };
    getLoggedInUser();
  }, [dispatch]);

  return (
    <>
      {hasFetchedUserOnce && (
        <Router>
          <Toaster />
          <Topbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate replace to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate replace to="/" /> : <Register />}
            />
            <Route
              path="/settings"
              element={
                isLoggedIn ? <Settings /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/write"
              element={
                isLoggedIn ? <Write /> : <Navigate replace to="/login" />
              }
            />
            <Route path="/post/:postId" element={<Post />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
