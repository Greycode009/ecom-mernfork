import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api/axios";

const Profile = () => {
    const { user, loadUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await api.put("/auth/profile", formData);
            await loadUser();
            setEditing(false);
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "error", text: "New passwords don't match" });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await api.put("/auth/change-password", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setMessage({ type: "success", text: "Password changed successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || "Failed to change password" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-neutral-600">
                        Manage your account settings and preferences
                    </p>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === "success"
                            ? "bg-green-50 border border-green-200 text-green-700"
                            : "bg-red-50 border border-red-200 text-red-700"
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-card p-6">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <h3 className="font-bold text-neutral-900">{user?.name}</h3>
                                <p className="text-sm text-neutral-600">{user?.email}</p>
                                {user?.role === "admin" && (
                                    <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                                        Admin
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Link to="/orders" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
                                    📦 My Orders
                                </Link>
                                <Link to="/cart" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
                                    🛒 Shopping Cart
                                </Link>
                                {user?.role === "admin" && (
                                    <>
                                        <Link to="/admin/orders" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
                                            ⚙️ Admin Orders
                                        </Link>
                                        <Link to="/admin/products" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
                                            📋 Admin Products
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Account Information */}
                        <div className="bg-white rounded-xl shadow-card p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-neutral-900">
                                    Account Information
                                </h2>
                                {!editing && (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {!editing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-500 mb-1">
                                            Full Name
                                        </label>
                                        <p className="text-neutral-900">{user?.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-500 mb-1">
                                            Email Address
                                        </label>
                                        <p className="text-neutral-900">{user?.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-500 mb-1">
                                            Account Created
                                        </label>
                                        <p className="text-neutral-900">
                                            {new Date(user?.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleProfileUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={loading}
                                        >
                                            {loading ? <LoadingSpinner size="sm" /> : "Save Changes"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => {
                                                setEditing(false);
                                                setFormData({ name: user?.name || "", email: user?.email || "" });
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Change Password */}
                        <div className="bg-white rounded-xl shadow-card p-6">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">
                                Change Password
                            </h2>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="input"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="input"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="input"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={loading}
                                >
                                    {loading ? <LoadingSpinner size="sm" /> : "Update Password"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
