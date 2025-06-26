import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar"; // replace Navbar with Sidebar
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<Explore />} />
            {/* <Route path="/profile" element={<Register />} /> */}
            {/* <Route path="/reels" element={<Register />} /> */}
            {/* <Route path="/notification" element={<Register />} /> */}
            {/* <Route path="/message" element={<Register />} /> */}
            {/* <Route path="/create" element={<Register />} /> */}
            <Route path="*" element={<PageNotFound />} />
            {/* Other routes */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
