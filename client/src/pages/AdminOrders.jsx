import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Badge from "../components/Badge";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [actionLoading, setActionLoading] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updatePayment = async (orderId, status) => {
    if (!window.confirm(`Mark order as ${status}?`)) return;
    setActionLoading(orderId);
    try {
      await api.put(`/orders/${orderId}/payment`, { status });
      fetchOrders();
    } catch (err) {
      alert("Failed to update payment status");
    } finally {
      setActionLoading(null);
    }
  };

  const updateStatus = async (orderId, status) => {
    setActionLoading(orderId);
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert("Failed to update order status");
    } finally {
      setActionLoading(null);
    }
  };

  // 🔍 Filtered result
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order._id.toLowerCase().includes(searchText) ||
        order.user?.email?.toLowerCase().includes(searchText);

      const matchesPayment =
        paymentFilter === "all" || order.payment.status === paymentFilter;

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesPayment && matchesStatus;
    });
  }, [orders, search, paymentFilter, statusFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg mx-6 mt-6">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900">
              Order Management
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage and track all customer orders
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-neutral-200">
            <div className="text-sm font-medium text-neutral-600">
              Total Orders:
            </div>
            <div className="text-xl font-bold text-primary-600">
              {orders.length}
            </div>
          </div>
        </div>

        {/* 🔍 Filters */}
        <div className="bg-white p-4 rounded-xl shadow-card mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <svg
              className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search Order ID or Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 input w-full"
            />
          </div>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="pending_payment">Pending</option>
            <option value="processing">Processing</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* 📦 Orders Table */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Items & Total
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="text-neutral-500">No matching orders found</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-primary-600">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <div className="text-xs text-neutral-400 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-neutral-900">
                          {order.user?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {order.user?.email}
                        </div>
                        {order.activationDetails?.phone && (
                          <div className="text-xs text-neutral-400 mt-1">
                            📞 {order.activationDetails.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {order.orderItems.map((i, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-neutral-700 truncate max-w-[200px]"
                              title={i.title}
                            >
                              {i.qty}× {i.title}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm font-bold text-neutral-900 mt-2">
                          NPR {order.totalPrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {order.payment.status === "paid" ? "PAID" : "UNPAID"}
                        </span>
                        {order.payment.status !== "paid" && (
                          <button
                            onClick={() => updatePayment(order._id, "paid")}
                            className="block mt-2 text-xs text-primary-600 hover:text-primary-800 font-medium"
                            disabled={actionLoading === order._id}
                          >
                            Mark Paid
                          </button>
                        )}
                        {order.payment.status === "paid" && (
                          <button
                            onClick={() => updatePayment(order._id, "unpaid")}
                            className="block mt-2 text-xs text-red-600 hover:text-red-800 font-medium"
                            disabled={actionLoading === order._id}
                          >
                            Mark Unpaid
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          disabled={actionLoading === order._id}
                          className={`text-xs font-medium rounded-full px-3 py-1 border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 ${order.status === "fulfilled"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-neutral-100 text-neutral-800"
                            }`}
                        >
                          <option value="pending_payment">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="fulfilled">Fulfilled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {actionLoading === order._id && (
                          <div className="text-xs text-neutral-400 mt-1">
                            Updating...
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`https://wa.me/${order.activationDetails?.phone || ""
                            }?text=Hello, regarding your order #${order._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-600 hover:text-green-800"
                          title="Contact on WhatsApp"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

