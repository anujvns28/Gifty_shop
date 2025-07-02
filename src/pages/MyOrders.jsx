import React, { useEffect, useState } from "react";
import { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../service/operation/order";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const resonse = await getUserOrders(user._id, dispatch);
    if (resonse) {
      setOrders(resonse.orders);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders) {
    return <div className="text-center py-10">Loading Order...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {orders ? (
        orders.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">Gifty_shop_2</h2>
            <p className="text-md text-gray-600">
              You haven't placed any orders yet.
            </p>
            <p className="text-sm text-gray-500">Start shopping now!</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-5 py-2 text-white bg-black rounded-full hover:bg-opacity-80 text-sm"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order, index) => (
              <div
                onClick={() => navigate(`/order-details/${order._id}`)}
                key={index}
                className="bg-white cursor-pointer border rounded-lg p-3 shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Top: Product Image + Info */}
                <div className="flex gap-3">
                  <img
                    src={order.productId.mainImage}
                    alt={order.productId.productName}
                    className="w-24 h-24 rounded-md object-contain bg-gray-50 border"
                  />

                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 leading-snug">
                        {order.productId.productName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Order ID:{" "}
                        <span className="font-medium text-gray-700">
                          {order.orderId}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹ {order.totalAmount}
                      </p>
                    </div>

                    <span
                      className={`mt-2 text-[11px] px-2 py-1 rounded-full w-fit font-medium
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Bottom: Payment ID + Date */}
                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  <p>Payment ID: {order.paymentId}</p>
                  <p>
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center text-gray-500 py-10">Loading orders...</div>
      )}
    </div>
  );
};

export default MyOrders;
