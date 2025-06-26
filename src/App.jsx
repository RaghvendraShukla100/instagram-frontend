import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar"; // replace Navbar with Sidebar
import Home from "./pages/Home";

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
            {/* Other routes */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
