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
    <div className="mx-auto mt-8 w-full max-w-3xl px-4 sm:mt-12 md:mt-16 lg:mt-10">
      <div className="overflow-hidden rounded-[8px] border border-gray-100 bg-white shadow-md">
        {/* Header */}
        <div className="relative flex flex-col items-center gap-4 border-b border-gray-100 bg-neutral-50/60 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              loading="lazy"
              className="h-16 w-16 rounded-full ring-2 ring-[#FE4A49] ring-offset-2"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl">
                {user.username}
              </h2>
              <p className="text-xs text-gray-500 sm:text-sm">{user.email}</p>
            </div>
          </div>
          {!editMode && (
            <button
              type="button"
              onClick={handleEdit}
              className="cursor-pointer rounded-[5px] bg-[#FE4A49] px-5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-red-600/90 sm:text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Form */}
        <form className="space-y-5 px-6 py-6">
          {/* Username */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full rounded-[5px] border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base ${!editMode ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-300"}`}
            />
          </div>

          {/* Email */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full rounded-[5px] border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base"
            />
          </div>

          {/* Gender */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full rounded-[5px] border px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base ${!editMode ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-300"}`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          {/* Country */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="e.g., Nepal, USA"
              disabled={!editMode}
              className={`w-full rounded-[5px] border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base ${!editMode ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-300"}`}
            />
          </div>

          {/* Age */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              placeholder="e.g., 18, 22"
              onChange={handleChange}
              disabled={!editMode}
              min={0}
              className={`w-full rounded-[5px] border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base ${!editMode ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-300"}`}
            />
          </div>

          {/* Contact */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="e.g., 9840xxxxxx"
              disabled={!editMode}
              className={`w-full rounded-[5px] border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base ${!editMode ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-300"}`}
            />
          </div>

          {/* Address */}
          <div className="grid gap-2 sm:grid-cols-4 sm:items-center">
            <label className="text-xs font-medium text-gray-700 sm:col-span-1 sm:text-sm">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="e.g., Downtown Street 948"
              disabled={!editMode}
              className={`w-full rounded-[5px] border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FE4A49] focus:outline-none sm:col-span-3 sm:px-4 sm:py-2.5 sm:text-base ${!editMode ? "border-gray-200 bg-gray-50 text-gray-600" : "border-gray-300"}`}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end sm:gap-4">
            {editMode && (
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="text-md cursor-pointer rounded-lg bg-emerald-500 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:px-6 sm:py-2.5 sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="cursor-pointer rounded-lg bg-gray-500 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-gray-600 sm:px-6 sm:py-2.5 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
