import React from "react";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";

const Settings = () => {
  // Dummy user data for demonstration; replace with real user context/state as needed
  const [editMode, setEditMode] = React.useState(false);
  const { api } = useFinance();
  const [user, setUser] = React.useState({
    avatar: `https://ui-avatars.com/api/?name=${localStorage.getItem("username") || "User"}&background=FE4A49&color=fff`,
    username: localStorage.getItem("username") || "User",
    email: localStorage.getItem("email") || "user@example.com",
    gender: localStorage.getItem("gender") || "",
    country: localStorage.getItem("country") || "",
    age: localStorage.getItem("age") || "",
    contact: localStorage.getItem("contact") || "",
    address: localStorage.getItem("address") || "",
  });
  const [form, setForm] = React.useState(user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    // Save all fields to localStorage
    Object.entries(form).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    // API calling
    try {
      const response = await api.post("/api/user/savesetting", {
        name: form.username,
        email: form.email,
      });
      if (response.data.success) {
        toast.success("Settings saved successfully!");
      }
    } catch (error) {
      console.log("handle save error:", error);
      toast.error("Failed to save settings.");
    }
    setUser(form);
    setEditMode(false);
    console.log(user.username);
  };

  return (
    <div className="mt-8 w-full max-w-md px-4 sm:mx-auto sm:mt-12 md:mt-16 md:max-w-lg lg:mt-10 lg:ml-20">
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-start">
        <img
          src={user.avatar}
          alt="User Avatar"
          loading="lazy"
          className="h-16 w-16 rounded-full border-4 border-[#FE4A49]"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl leading-snug font-semibold">
            {user.username}
          </h2>
          <p className="leading-tight text-gray-500">{user.email}</p>
        </div>
      </div>
      <form className="space-y-6">
        {/* Username */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium sm:flex-1">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%] ${!editMode ? "border-gray-400 bg-gray-100" : "border-black"}`}
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium text-gray-700 sm:flex-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%]"
          />
        </div>
        {/* Gender */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium text-gray-700 sm:flex-1">
            Gender:
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%] ${!editMode ? "border-gray-400 bg-gray-100" : "border-black"}`}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        {/* Country */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium text-gray-700 sm:flex-1">
            Country:
          </label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="eg. Nepal, USA"
            disabled={!editMode}
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%] ${!editMode ? "border-gray-400 bg-gray-100" : "border-black"}`}
          />
        </div>
        {/* Age */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium text-gray-700 sm:flex-1">
            Age:
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            placeholder="eg. 18, 22"
            onChange={handleChange}
            disabled={!editMode}
            min={0}
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%] ${!editMode ? "border-gray-400 bg-gray-100" : "border-black"}`}
          />
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium text-gray-700 sm:flex-1">
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="eg. 9840xxxxxx"
            disabled={!editMode}
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%] ${!editMode ? "border-gray-400 bg-gray-100" : "border-black"}`}
          />
        </div>
        {/* Address */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-md flex-shrink-0 font-medium text-gray-700 sm:flex-1">
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="eg. Downtown Street 948"
            disabled={!editMode}
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:w-[75%] ${!editMode ? "border-gray-400 bg-gray-100" : "border-black"}`}
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end sm:gap-4">
          {!editMode ? (
            <button
              type="button"
              onClick={handleEdit}
              className="cursor-pointer rounded-md bg-[#FE4A49] px-6 py-2 text-white transition hover:bg-red-600/80"
            >
              Edit
            </button>
          ) : (
            <div className="flex items-start justify-between gap-8">
              <button
                type="button"
                onClick={handleSave}
                className="cursor-pointer rounded-md bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="cursor-pointer rounded-md bg-gray-500 px-6 py-2 text-white transition hover:bg-green-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Settings;
