import { setProductLoading } from "../../slice/Product"
import { categoryEndPoints } from "../api"
import { apiConnector } from "../apiconnecter"

const {
    GET_ALL_CATEGORY_API,
    FETCH_CATEGORY_INFO_API,
    CREATE_CATEGORY_API,
    UPDATE_CATEGORY_API,
    DELETE_CATEGORY_API
  } = categoryEndPoints

export const getAllCategories = async() =>{
 
    let result
    try{
     const response = await apiConnector("GET",GET_ALL_CATEGORY_API,)
     console.log("CAtegory api response",response)
     result = response.data
    }catch(err){
      console.log("All Category fetching  API ERROR....", err);
    }
    return result 
  }


  export const CategoryInfo = async(data) =>{
 
    let result =[]
    try{
     const response = await apiConnector("POST",FETCH_CATEGORY_INFO_API,{categoryId:data})
     //console.log("CAtegory info api response",response)
     result = response.data
    }catch(err){
      console.log("Category info fetching  API ERROR....", err);
    }
    return result 
  }


  export const createCategory = async(data,dispatch) =>{
    dispatch(setProductLoading(true));
    try{
     const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_API,
      data
    );

     console.log("CAtegory creation api response",response)

    }catch(err){
      console.log("category creation   API ERROR....", err);
    }
    dispatch(setProductLoading(false)); 
  }


  export const deleteCategory = async(categoryId,dispatch) =>{
    dispatch(setProductLoading(true));
    try{
     const response = await apiConnector(
      "POST",
      DELETE_CATEGORY_API,
      {categorieId: categoryId}
    );

     console.log("CAtegory deleation api response",response)

    }catch(err){
      console.log("category delation   API ERROR....", err);
    }
    dispatch(setProductLoading(false)); 
  }


  export const updateCategory = async(categoryId,data,dispatch) =>{
    dispatch(setProductLoading(true));
    const categoryData = {
      categorieId: categoryId,
      categoriesName: data.categoriesName,
      categoriesDesc: data.categoriesDesc
    }
    try{
     const response = await apiConnector(
      "POST",
      UPDATE_CATEGORY_API,
      categoryData
    );

     console.log("CAtegory updation api response",response)

    }catch(err){
      console.log("category updation   API ERROR....", err);
    }
    dispatch(setProductLoading(false)); 
  }