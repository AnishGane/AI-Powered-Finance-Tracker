import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";

const Settings = () => {
  const { username, updateUsername, token } = useFinance();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(localStorage.getItem("email") || "user@example.com");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update username in context and localStorage
      updateUsername(editedUsername);
      localStorage.setItem("email", editedEmail);
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUsername(username);
    setEditedEmail(localStorage.getItem("email") || "user@example.com");
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F4EA] p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Settings</h1>
        
        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 flex items-center space-x-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#FE4A49] to-[#c9302c] text-2xl font-bold text-white">
              {getInitials(username || "User")}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {username || "User"}
              </h2>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg bg-[#FE4A49] px-6 py-2 text-white transition hover:bg-[#e63b38] focus:outline-none focus:ring-2 focus:ring-[#FE4A49]/40"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-lg bg-[#FE4A49] px-6 py-2 text-white transition hover:bg-[#e63b38] focus:outline-none focus:ring-2 focus:ring-[#FE4A49]/40 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm transition focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20 outline-none"
                    placeholder="Enter your username"
                  />
                ) : (
                  <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                    {username || "Not set"}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm transition focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20 outline-none"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                    {editedEmail || "Not set"}
                  </div>
                )}
              </div>

              {/* Account Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status
                </label>
                <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    Active
                  </span>
                </div>
              </div>

              {/* Member Since */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Preferences Card */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Currency</span>
                <span className="text-gray-800 font-medium">₹ (INR)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Theme</span>
                <span className="text-gray-800 font-medium">Light</span>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Security
            </h3>
            <div className="space-y-4">
              <button className="w-full rounded-lg border border-[#FE4A49] px-4 py-2 text-[#FE4A49] transition hover:bg-[#FE4A49] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FE4A49]/40">
                Change Password
              </button>
              <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
