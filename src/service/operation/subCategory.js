import { setProductLoading } from "../../slice/Product"
import { subCtegoryEndPoints } from "../api"
import { apiConnector } from "../apiconnecter"

const {
    GET_CATEGORY_SUBCATEGORY,
    FETCH_SUBCATEGORY_WISE_PRODUCT_API,
    CREATE_SUBCATEGORY_API,
    UPDATE_SUBCATEGORY_API,
    DELETE_SUBCATEGORY_API
} = subCtegoryEndPoints

export const getAllSubCategories = async(categoryId) =>{
    let result =[]
    try{
     const response = await apiConnector("POST",GET_CATEGORY_SUBCATEGORY,{categoryId:categoryId})
  
     //console.log("Categories SubCategory api response",response)
     result = response.data.subCategoryes
    }catch(err){
      console.log("All Categories SubCategory fetching  API ERROR....", err);
    }
    return result
  }


  export const getAllSubCategoriesProduct = async(data,dispatch) =>{
    dispatch(setProductLoading(true));
    let result =[]
    try{
     const response = await apiConnector("POST",FETCH_SUBCATEGORY_WISE_PRODUCT_API,{subCategoryId:data})
  
     //console.log(" SubCategory product api response",response)
     result = response.data
    }catch(err){
      console.log(" SubCategory product fetching  API ERROR....", err);
    }
    dispatch(setProductLoading(false));
    return result
  }


   export const createSubCategory = async(data,dispatch) =>{
      dispatch(setProductLoading(true));
      try{
       const response = await apiConnector(
        "POST",
        CREATE_SUBCATEGORY_API,
        data
      );
  
       console.log("subCAtegory creation api response",response)
  
      }catch(err){
        console.log("subcategory creation   API ERROR....", err);
      }
      dispatch(setProductLoading(false)); 
    }
  
  
    export const deleteSubCategory = async(subCategoryId,dispatch) =>{
      dispatch(setProductLoading(true));
      try{
       const response = await apiConnector(
        "POST",
        DELETE_SUBCATEGORY_API,
        {subCategoryId: subCategoryId}
      );
  
       console.log("sub CAtegory deleation api response",response)
  
      }catch(err){
        console.log(" sub category delation   API ERROR....", err);
      }
      dispatch(setProductLoading(false)); 
    }
  
  
    export const updateSubCategory = async(data,dispatch) =>{
      dispatch(setProductLoading(true));

      try{
       const response = await apiConnector(
        "POST",
        UPDATE_SUBCATEGORY_API,
        data
      );
  
       console.log("CAtegory updation api response",response)
  
      }catch(err){
        console.log("category updation   API ERROR....", err);
      }
      dispatch(setProductLoading(false)); 
    }