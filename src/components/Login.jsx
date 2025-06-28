import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainContentWrapper from "./MainContentWrapper";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Login data:", data);

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("Login success:", response.data);

      // ✅ Store token and user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ Redirect to home/dashboard after login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      console.log("Error response data:", error?.response?.data);
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  return (
    <MainContentWrapper>
      <div className="flex justify-center items-center h-full w-full">
        <div className="p-8 rounded-sm shadow-2xl w-full max-w-sm border border-gray-300 dark:border-gray-700 transition duration-500">
          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-sm text-center mb-6">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              {...register("password", { required: true })}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-sm transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              onClick={handleSignupClick}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </MainContentWrapper>
  );
};

// Reusable input field component
const Input = ({ label, type = "text", placeholder, ...rest }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...rest}
      className="w-full px-4 py-2 border rounded-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
    />
  </div>
);

export default Login;
