import toast from "react-hot-toast";
import { paymentEndpoints } from "../api";
import { apiConnector } from "../apiconnecter";
import rzpLogo from "../../assets/Resinart_Logo.png";



const {SEND_PAYMENT_SUCCESS_EMAIL_API,SHOUSE_PAYMENT_API,SHOUSE_VERIFY_API} = paymentEndpoints

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyShouse(
  shouses,
  userDetails,
  addressId,
  deliveryCharge
) {
  const userId = userDetails._id;
  const toastId = toast.loading("Loading...");
  try {
    //load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    //initiate the order
    const orderResponse = await apiConnector("POST", SHOUSE_PAYMENT_API, {
      shouses,
      deliveryCharge,
    });

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log("PRINTING orderResponse", orderResponse);
    console.log("razorpay key", process.env.REACT_APP_RAZORPAY_KEY);

    //options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "Gifty_shop_2",
      description: "Thank You for Purchasing the Shouse",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        verifyPayment({
          ...response,
          shouses,
          userId,
          addressId,
          deliveryCharge,
        });
      },
    };
    console.log(options, "this is printing options");

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error, "printing error");
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}



async function verifyPayment(bodyData) {

    console.log(bodyData,"this is body data")
    const toastId = toast.loading("Veryfing Payment...")
    try{
        const response  = await apiConnector("POST", SHOUSE_VERIFY_API, bodyData)

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful");
        // navigate("/dashboard/enrolled-courses");
       
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    
}