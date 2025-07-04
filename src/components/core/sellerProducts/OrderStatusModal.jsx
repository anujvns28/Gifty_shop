// src/components/OrderStatusModal.jsx
import React from "react";

const OrderStatusModal = ({
  isOpen,
  onClose,
  onUpdate,
  selectedStatus,
  setSelectedStatus,
  order,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Order Status</h2>

        <div className="mb-4 space-y-1 text-sm">
          <p><strong>Customer Name:</strong>{order.userId.firstName}{" "} {order.userId.lastName}</p>
          <p><strong>Order ID:</strong> {order?.orderId}</p>
          <p><strong>Current Status:</strong> {order?.orderStatus}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Select New Status:</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((status, i) => (
              <option key={i} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
