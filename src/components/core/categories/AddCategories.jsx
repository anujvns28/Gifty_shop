import React, { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../../../service/operation/category"; // Make sure you have updateCategory API
import { useDispatch, useSelector } from "react-redux";

const AddCategories = ({ setOpenCategoryForm, fetchCategories, isEdit, categoryData }) => {

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const { productLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  // Prefill data if editing
  useEffect(() => {
    if (isEdit && categoryData) {
      setCategoryName(categoryData.categoriesName || "");
      setCategoryDescription(categoryData.categoriesDesc || "");
    }
  }, [isEdit, categoryData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      categoriesName: categoryName,
      categoriesDesc: categoryDescription,
    };

    if (isEdit) {
      // For Editing (Pass ID and updated data)
      await updateCategory(categoryData._id, data, dispatch);
    } else {
      // For Adding New Category
      await createCategory(data, dispatch);
    }

    setOpenCategoryForm(false);
    fetchCategories();
  };

  if (productLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={() => setOpenCategoryForm(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? "Edit Category" : "Add New Category"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              placeholder="Enter category name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="categoryDescription">
              Description
            </label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              placeholder="Enter description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={categoryDescription}
              onChange={(event) => setCategoryDescription(event.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isEdit ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
