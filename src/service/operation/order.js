import { setUserLoading } from "../../slice/user"
import { orderEndPoints } from "../api"
import { apiConnector } from "../apiconnecter";


const {
  GET_USER_ORDERS_API,
  UPDATE_ORDER_STATUS_API,
  GET_SINGLE_ORDER_API,
  GET_ALL_CATEGORY_API,
  UPDATE_ORDER_STATUS_FOR_ADMIN_API,
} = orderEndPoints;

export const getUserOrders = async (userId, dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await apiConnector("POST", GET_USER_ORDERS_API, {
      userId: userId,
    });
    console.log("user order api response", response);
    result = response.data;
  } catch (err) {
    console.log("user order fetching  API ERROR....", err);
  }
  dispatch(setUserLoading(false));
  return result;
};

export const getOrderDetails = async (orderId, dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await apiConnector("POST", GET_SINGLE_ORDER_API, {
      orderId: orderId,
    });
    console.log("user order details api response", response);
    result = response.data;
  } catch (err) {
    console.log("user order details fetching  API ERROR....", err);
  }
  dispatch(setUserLoading(false));
  return result;
};

export const getAllOrderForAdmin = async (dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORY_API);
    console.log("admin order details api response", response);
    result = response.data;
  } catch (err) {
    console.log("admin order details fetching  API ERROR....", err);
  }
  dispatch(setUserLoading(false));
  return result;
};

export const updateOrderStatus = async (orderId, status, dispatch) => {
  dispatch(setUserLoading(true));
  let result;
  try {
    const response = await apiConnector(
      "POST",
      UPDATE_ORDER_STATUS_FOR_ADMIN_API,
      {
        orderId: orderId,
        status: status,
      }
    );
    console.log("update order status api response", response);
    result = response.data;
  } catch (err) {
    console.log("update order status API ERROR....", err);
  }
  dispatch(setUserLoading(false));
  return result;
};
