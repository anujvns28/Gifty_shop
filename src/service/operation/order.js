import { setUserLoading } from "../../slice/user"
import { orderEndPoints } from "../api"
import { apiConnector } from "../apiconnecter";


const {
    GET_USER_ORDERS_API,
    UPDATE_ORDER_STATUS_API ,
    GET_SINGLE_ORDER_API
} = orderEndPoints


export const getUserOrders = async(userId,dispatch) =>{
    dispatch(setUserLoading(true));
    let result
    try{
     const response = await apiConnector("POST",GET_USER_ORDERS_API,{userId:userId})
     console.log("user order api response",response)
     result = response.data
    }catch(err){
      console.log("user order fetching  API ERROR....", err);
    }
    dispatch(setUserLoading(false))
    return result 
  }

export const getOrderDetails = async(orderId,dispatch) =>{
    dispatch(setUserLoading(true));
    let result
    try{
     const response = await apiConnector("POST",GET_SINGLE_ORDER_API,{orderId:orderId})
     console.log("user order details api response",response)
     result = response.data
    }catch(err){
      console.log("user order details fetching  API ERROR....", err);
    }
    dispatch(setUserLoading(false))
    return result 
  }  