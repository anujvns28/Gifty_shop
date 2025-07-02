import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../service/operation/order";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaCheckCircle } from "react-icons/fa";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrderDetails = async () => {
    const data = await getOrderDetails(orderId, dispatch);
    if (data?.success) {
      setOrderDetails(data.order);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const generateInvoice = () => {
    const doc = new jsPDF();
    const {
      orderId,
      paymentId,
      createdAt,
      totalAmount,
      orderStatus,
      productId,
      addressId,
      deliveryCharge,
    } = orderDetails;

    const grandTotal = totalAmount + deliveryCharge;

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Gifty_Shop_2", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("giftyshop78@gmail.com", 14, 26);

    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Invoice Date: ${new Date(createdAt).toLocaleString()}`, 150, 20, { align: "right" });
    doc.text(`Order ID: ${orderId}`, 150, 26, { align: "right" });
    doc.text(`Payment ID: ${paymentId}`, 150, 32, { align: "right" });

    doc.setDrawColor(200);
    doc.line(14, 38, 195, 38);

    doc.setFontSize(12);
    doc.setTextColor(30);
    doc.text("Billing & Shipping Address", 14, 46);
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`${addressId.address}, ${addressId.locality}`, 14, 52);
    doc.text(`${addressId.city}, ${addressId.state} - ${addressId.pincode}`, 14, 58);
    doc.text(`Phone: ${addressId.phoneNumber}`, 14, 64);

    autoTable(doc, {
      startY: 75,
      head: [["Description", "Price", "Qty", "Total"]],
      body: [
        [
          productId.productName,
          `₹${productId.price}`,
          "1",
          `₹${totalAmount}`,
        ],
        [
          "Delivery Charges",
          `₹${deliveryCharge}`,
          "",
          `₹${deliveryCharge}`,
        ],
      ],
      styles: {
        fontSize: 10,
        halign: "center",
      },
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const tableFinalY = doc.lastAutoTable.finalY;

    doc.setFontSize(12);
    doc.setTextColor(30);
    doc.text(`Grand Total: ₹${grandTotal}`, 150, tableFinalY + 10, { align: "right" });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for shopping with Gifty_Shop_2!", 105, tableFinalY + 25, { align: "center" });

    doc.save(`invoice_${orderId}.pdf`);
  };

  if (!orderDetails) {
    return <div className="text-center py-10">Loading Order Details...</div>;
  }

  const {
    productId,
    paymentId,
    orderId: razorpayOrderId,
    totalAmount,
    createdAt,
    addressId,
    orderStatus,
    deliveryCharge,
  } = orderDetails;

  const orderSteps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
  const currentStepIndex = orderSteps.indexOf(orderStatus);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center border-b pb-2">Order Details</h2>

      {/* Tracking UI */}
      <div className="mb-10 flex items-center justify-between relative">
        {orderSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1 relative z-10">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full 
              ${index <= currentStepIndex
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-600"
              }`}
            >
              {index <= currentStepIndex ? <FaCheckCircle /> : index + 1}
            </div>
            <p className="text-sm mt-2 text-center">{step}</p>
          </div>
        ))}
        <div className="absolute top-4 left-4 right-4 h-1 bg-gray-300 z-0">
          <div
            className="h-1 bg-green-600"
            style={{
              width: `${((currentStepIndex + 1) / orderSteps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><span className="font-semibold">Order ID:</span> {razorpayOrderId}</p>
        <p><span className="font-semibold">Payment ID:</span> {paymentId}</p>
        <p><span className="font-semibold">Product Price:</span> ₹{totalAmount}</p>
        <p><span className="font-semibold">Delivery Charge:</span> ₹{deliveryCharge}</p>
        <p><span className="font-semibold">Grand Total:</span> ₹{totalAmount + deliveryCharge}</p>
        <p><span className="font-semibold">Order Status:</span> {orderStatus}</p>
        <p><span className="font-semibold">Placed On:</span> {new Date(createdAt).toLocaleString()}</p>
      </div>

      {/* Product Info */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row items-center gap-6 mb-6">
        <img src={productId.mainImage} alt={productId.productName} className="w-32 h-32 object-cover rounded" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{productId.productName}</h3>
          <p className="text-sm text-gray-600 mb-2">{productId.productDes}</p>
          <p><span className="font-semibold">Price:</span> ₹{productId.price}</p>
          <p><span className="font-semibold">Color:</span> {productId.color}</p>
          <p><span className="font-semibold">For:</span> {productId.forWhom}</p>
        </div>
      </div>

      {/* Address Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
        <p>{addressId.address}, {addressId.locality}, {addressId.city}</p>
        <p>{addressId.state} - {addressId.pincode}</p>
        <p><span className="font-semibold">Phone:</span> {addressId.phoneNumber}</p>
      </div>

      {/* Invoice Download */}
      <div className="text-right mt-4">
        <button
          onClick={generateInvoice}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
