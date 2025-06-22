import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash,
  FiChevronRight,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";
import { deleteCategory, getAllCategories } from "../service/operation/category";
import AddCategories from "../components/core/categories/AddCategories";
import Modal from "../components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import AddSubCategory from "../components/core/categories/AddSubCategory";
import { deleteSubCategory } from "../service/operation/subCategory";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [openCategoryFrom, setOpenCategoryForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState();
  const {productLoading} = useSelector((state) => state.product);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [openSubCategoryForm, setOpenSubCategoryForm] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [isEditSubCategory, setIsEditSubCategory] = useState(false);
  const [presentCategoryId, setPresentCategoryId] = useState(null);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const fetchCategories = async () => {
    const result = await getAllCategories();
    if (result) {
      setCategories(result.data);
    } else {
      console.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (categoryId) => {
    await deleteCategory(categoryId,dispatch);
    fetchCategories();
    setDeleteModal(null);
  }


  const handleEdit = (category) => {
    setIsEdit(true);
    setCategoryData(category);
    setOpenCategoryForm(true);
  }

    const handleEditSubCategory = (subCategory) => {
        setIsEditSubCategory(true);
        setSubCategoryData(subCategory);    
        setOpenSubCategoryForm(true);
    }

    const handleAddSubCategory = (categoryId) => {
         setPresentCategoryId(categoryId);
         setOpenSubCategoryForm(true);
    }

    const handleDeleteSubCategory = async(subCategoryId) => {
        await deleteSubCategory(subCategoryId,dispatch);
        fetchCategories();
        setDeleteModal(null);   
    }

  useEffect(() => {
    fetchCategories();
  }, []);

  

  if (!categories || productLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <button
            onClick={() => setOpenCategoryForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Category
          </button>
        </div>

        <div className="space-y-4">
          {/* Category */}
          {categories.map((category) => {
            return (
              <details className="border rounded-lg p-4 group">
                <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold">
                  <div className="flex items-center">
                    <span className="mr-2">
                      <FiChevronRight className="group-open:hidden" />
                      <FiChevronDown className="hidden group-open:inline" />
                    </span>
                    {category.categoriesName}
                  </div>

                  <div className="flex items-center space-x-3">
                    <FiEdit onClick={() => handleEdit(category)}
                    className="text-green-600 cursor-pointer hover:text-green-800" />

                    <FiTrash
                      onClick={() =>
                        setDeleteModal({
                          text1: "Delete Category",
                          text2: "Are you sure want to Delete?",
                          btn1: "Cancle",
                          btn2: "Delete",
                          handler1: () => setDeleteModal(null),
                          handler2: () => handleDelete(category._id),
                        })
                      }
                      className="text-red-600 cursor-pointer hover:text-red-800"
                    />
                  </div>
                </summary>

                {/* Subcategories */}
                <div 
                className="mt-4 space-y-3 pl-6 border-l-2 border-gray-200">
                  {category.subCategories.map((subCategory) => {
                    return (
                      <div onClick={() => navigate(`/sub-categories/${subCategory._id}`)}
                      className="mt-4 cursor-pointer space-y-3 pl-6 border-l-2 border-gray-400">
                        <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                          <div className="flex items-center space-x-3">
                            <img
                              src={subCategory.image}
                              alt={subCategory.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <span className="text-base text-gray-900">
                              {subCategory.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FiEdit onClick={()=>handleEditSubCategory(subCategory)}
                            className="text-green-700 cursor-pointer hover:text-green-900 w-4 h-4" />

                            <FiTrash 
                            onClick={() =>
                              setDeleteModal({
                                text1: "Delete Subcategory",
                                text2: "Are you sure want to Delete?",
                                btn1: "Cancle",
                                btn2: "Delete",
                                handler1: () => setDeleteModal(null),
                                handler2: () =>
                                  handleDeleteSubCategory(subCategory._id),
                              })
                            }
                            className="text-red-700 cursor-pointer hover:text-red-900 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Add Subcategory Button */}
                <div 
                className="mt-4">
                  <button onClick={()=>handleAddSubCategory(category._id)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium">
                    <FiPlus />
                    <span>Add  Subcategory</span>
                  </button>
                </div>
              </details>
            );
          })}
        </div>
      </div>
      {openCategoryFrom && (
        <AddCategories
          setOpenCategoryForm={setOpenCategoryForm}
          fetchCategories={fetchCategories}
          categoryData={categoryData}
            isEdit={isEdit}
        />
      )}
      {deleteModal && <Modal modalData={deleteModal} />}

      {openSubCategoryForm && <AddSubCategory 
      fetchCategories={fetchCategories}
      parsentCategoryId={presentCategoryId}
      setOpenSubCategoryForm={setOpenSubCategoryForm} 
        subCategoryData={subCategoryData}
        isEdit={isEditSubCategory}
        setIsEdit={setIsEditSubCategory}
        setSubCategoryData={setSubCategoryData}
      />}
    </div>
  );
};

export default Categories;
