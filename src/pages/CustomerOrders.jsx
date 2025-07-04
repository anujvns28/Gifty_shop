import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForAdmin, updateOrderStatus } from "../service/operation/order";
import OrderStatusModal from "../components/core/sellerProducts/OrderStatusModal";
import { useNavigate } from "react-router-dom";

const orderStatusOptions = [
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const CustomerOrders = () => {
  const { user, userLoading } = useSelector((state) => state.profile);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCustomerOrders = async () => {
    const result = await getAllOrderForAdmin(dispatch);
    if (result) {
      setCustomerOrders(result.orders);
      setFilteredOrders(result.orders);
    }
  };

  const updateStatus = async () => {
    const updated = await updateOrderStatus(selectedOrder._id, selectedStatus, dispatch);
    if (updated) {
      setIsModalOpen(false);
      setSelectedOrder(null);
      setSelectedStatus("");
      fetchCustomerOrders(); 
    }
  }

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  useEffect(() => {
    if (selectedStatusFilter === "All") {
      setFilteredOrders(customerOrders);
    } else {
      const filtered = customerOrders.filter(order => order.orderStatus === selectedStatusFilter);
      setFilteredOrders(filtered);
    }
  }, [selectedStatusFilter, customerOrders]);

  if (userLoading) {
    return <div className="h-screen w-screen flex items-center justify-center"><div className="custom-loader"></div></div>;
  }

  return (
    <div className="p-6 min-h-screen w-full bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Admin - Customer Orders</h2>

      <div className="mb-6">
        <label htmlFor="status" className="text-gray-700 font-medium mr-3">Filter by Status:</label>
        <select
          id="status"
          className="border rounded px-3 py-1"
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          {["Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((status, index) => (
            <option key={index} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-left bg-white shadow rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Order Info</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Delivery Charge</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Delivery Details</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-4 text-gray-500">No orders found.</td></tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <div className="flex flex-col gap-1">
                      <div><strong>Order ID:</strong> {order.orderId}</div>
                      <div><strong>Product ID:</strong> {order.productId?._id}</div>
                      <div><strong>Payment ID:</strong> {order.paymentId}</div>
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    {order.userId?.firstName} {order.userId?.lastName}<br />
                    <span className="text-sm text-gray-500">{order.userId?.email}</span>
                  </td>

                  <td className="px-4 py-2">
                    <div onClick={() => navigate(`/shouse/${order.productId?._id}`)}
                    className="flex cursor-pointer items-center gap-2">
                      <img
                        src={order.productId?.mainImage}
                        alt={order.productId?.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div 
                      className="cursor-pointer ">
                        <p className="font-medium">{order.productId?.productName}</p>
                        <p className="text-sm text-gray-500">₹{order.productId?.price}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-2">₹{order.totalAmount}</td>
                  <td className="px-4 py-2">₹{order.deliveryCharge || 0}</td>

                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                        order.orderStatus === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.orderStatus}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setSelectedStatus(order.orderStatus);
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                      >Change Status</button>
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <details className="bg-gray-50 border border-gray-300 p-2 rounded-md">
                      <summary className="cursor-pointer text-blue-600 hover:underline">View Address</summary>
                      <div className="mt-2 text-sm text-gray-700 space-y-1">
                        <p><strong>Name:</strong> {order.addressId?.name}</p>
                        <p><strong>Phone:</strong> {order.addressId?.phoneNumber}</p>
                        <p><strong>Alternate:</strong> {order.addressId?.alternatePhoneNumber || "N/A"}</p>
                        <p><strong>Address:</strong> {order.addressId?.address}, {order.addressId?.locality}</p>
                        <p><strong>City:</strong> {order.addressId?.city}, {order.addressId?.state} - {order.addressId?.pincode}</p>
                        <p><strong>Landmark:</strong> {order.addressId?.landmark || "N/A"}</p>
                      </div>
                    </details>
                  </td>

                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={updateStatus}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        order={selectedOrder}
      />
    </div>
  );
};

export default CustomerOrders;
