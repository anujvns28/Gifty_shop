    const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP : BASE_URL + "/auth/sendOtp",
    SIGN_UP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    FORGOTPASSWORDTOKEN_API : BASE_URL + "/auth/forgotPasswordToken",
    FORGOTPASSWORD_API : BASE_URL + "/auth/forgotPassword",
    SEND_RESET_PASSWORD_MAIL : BASE_URL + "/auth/resetPasswordMial",
    RESET_PASSWORD_API : BASE_URL + "/auth/resetPassword"
}

export const categoryEndPoints = {
    GET_ALL_CATEGORY_API : BASE_URL + "/category/fetchallCategory",
    FETCH_CATEGORY_INFO_API : BASE_URL + "/category/categoryInfo",
    CREATE_CATEGORY_API : BASE_URL + "/category/createCategory",
    UPDATE_CATEGORY_API : BASE_URL + "/category/updateCategory",    
    DELETE_CATEGORY_API : BASE_URL + "/category/deleteCategories",
}

export const subCtegoryEndPoints = {
    GET_CATEGORY_SUBCATEGORY : BASE_URL + "/subCategory/fetchallSubCategory",
    FETCH_SUBCATEGORY_WISE_PRODUCT_API: BASE_URL + "/subCategory/subCategoryProduct",
    CREATE_SUBCATEGORY_API : BASE_URL + "/subCategory/createSubCategory",
    UPDATE_SUBCATEGORY_API : BASE_URL + "/subCategory/updateSubCategory",
    DELETE_SUBCATEGORY_API : BASE_URL + "/subCategory/deleteSubCategories",
}

export const productEndPoints = {
    GET_SINGLE_PRODUCT_API : BASE_URL + "/product/getSingleProduct",
    CREATE_PRODUCT_API : BASE_URL + "/product/create-product",
    GET_USER_PRODUCTS_API : BASE_URL + "/product/userProducts",
    CHANGE_DISCOUNT_API : BASE_URL + "/product/changeDiscount",
    UPDATE_PRODUCT_API : BASE_URL + "/product/editProduct",
    DELETE_PRODUCT_API : BASE_URL + "/product/deleteProduct",
    CREATE_RATING_API: BASE_URL + "/product/createRating",
    GET_RATING_AND_REVIEW_API : BASE_URL + "/product/getRatingAndReview",
    SEARCH_PRODUCT_API : BASE_URL + "/product/serchpProduct"
}

export const profileEndPoints = {
    UPDATE_PROFILE_API : BASE_URL + "/auth/updateProfile",
    UPDATE_PROFILE_IMG : BASE_URL + "/auth/updateProfileImg",
    ADD_ADDRESS : BASE_URL + "/auth/addAddress",
    DELETE_ADDRESS : BASE_URL + "/auth/deleteAddres",
    EDIT_ADDRESS : BASE_URL + "/auth/editAddress",
    UPDATE_PASSWORD : BASE_URL + "/auth/updatePassword"
}

export const paymentEndpoints = {
    SHOUSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    SHOUSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }


export const orderEndPoints = {
  GET_USER_ORDERS_API: BASE_URL + "/orders/fetch-orders",
  UPDATE_ORDER_STATUS_API: BASE_URL + "/orders/status",
  GET_SINGLE_ORDER_API: BASE_URL + "/orders/fetch-ordersDetails",
};