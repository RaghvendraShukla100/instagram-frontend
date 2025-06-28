import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainContentWrapper from "./MainContentWrapper";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Raw form data:", data);

      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("username", data.username || "");
      formData.append("email", data.email || "");
      formData.append("password", data.password || "");
      formData.append("age", data.age || "");
      formData.append("mobile", data.mobile || "");
      formData.append("bio", data.bio || "");
      formData.append(
        "isPrivate",
        data.accountType === "private" ? "true" : "false"
      );

      if (data.profilePic && data.profilePic[0]) {
        formData.append("profilePic", data.profilePic[0]);
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);

      // ✅ Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // ✅ Optional: Store user data in localStorage for easy retrieval
      localStorage.setItem("user", JSON.stringify(response.data));

      reset();

      // ✅ Redirect to home/dashboard after registration
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log("Error response data:", error?.response?.data);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <MainContentWrapper>
      <div className="p-8 rounded-sm shadow-2xl w-full max-w-xl border border-gray-300 dark:border-gray-700 transition duration-500">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <Input
              label="Name"
              placeholder="John Doe"
              {...register("name", { required: true })}
            />
            <Input
              label="Username"
              placeholder="johndoe"
              {...register("username", { required: true })}
            />
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
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FileInput label="Profile Picture" {...register("profilePic")} />
            <Input
              type="number"
              label="Age"
              placeholder="18"
              {...register("age", { min: 0 })}
            />
            <Input
              type="tel"
              label="Mobile"
              placeholder="+91 9876543210"
              {...register("mobile")}
            />
            <SelectInput
              label="Account Type"
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
              {...register("accountType", { required: true })}
            />
          </div>

          {/* Bio Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              {...register("bio")}
              rows="3"
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2 border rounded-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-sm transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={handleLoginRedirect}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </MainContentWrapper>
  );
};

// Reusable Text Input Component
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

// Reusable File Input
const FileInput = ({ label, ...rest }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input type="file" accept="image/*" {...rest} className="w-full" />
  </div>
);

// Reusable Select Input
const SelectInput = ({ label, options, ...rest }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      {...rest}
      className="w-full px-4 py-2 border rounded-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Register;
