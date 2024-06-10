const basename = import.meta.env.VITE_BASENAME;

// App components
import Header from "./components/Header";
import Footer from "./components/Footer";

// App pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Password from "./pages/Password";
import ListingPage from "./pages/ListingPage";
import NotFound from "./pages/NotFound";

// external
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {loadCookie } from "./app/utils";
import { noUser, userAtom } from "./app/atoms";
import PrivateRoute from "./components/PrivateRoute";
import UserInfos from "./pages/UserInfos";


export default function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
      setUser(loadCookie() ? loadCookie() : noUser);  
  }, [setUser]);
  return (
    <BrowserRouter basename={basename}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/:action" element={<Password />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          /><Route
          path="/userinfos"
          element={
            <PrivateRoute>
              <UserInfos />
            </PrivateRoute>
          }
        />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
