import React, { useState, useEffect } from "react";
import { createSubCategory, updateSubCategory } from "../../../service/operation/subCategory";
import { useDispatch, useSelector } from "react-redux";

const AddSubCategory = ({
  setOpenSubCategoryForm,
  fetchCategories,
  parsentCategoryId,
  isEdit = false,
  subCategoryData = null,
  setIsEdit,
  setSubCategoryData
}) => {
  const [subCatName, setSubCatName] = useState("");
  const [subCatDesc, setSubCatDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { productLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();


  // Prefill form if editing
  useEffect(() => {
    if (isEdit && subCategoryData) {
      setSubCatName(subCategoryData.name || "");
      setSubCatDesc(subCategoryData.desc || "");
      if (subCategoryData.image) {
        setImagePreview(subCategoryData.image);
      }
    }
  }, [isEdit, subCategoryData]);

  // Handle new image upload & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", subCatName);
    formData.append("desc", subCatDesc);
    if (image) formData.append("image", image);
    formData.append("categoryId", parsentCategoryId);
    formData.append("SubcategoryId",subCategoryData?._id || "");

    if (isEdit) {
      // Update subcategory by ID
      await  updateSubCategory(formData,dispatch);
      
    } else {
      // Create new subcategory
      await createSubCategory(formData,dispatch);
     
    }

    setOpenSubCategoryForm(false);
    fetchCategories();
    setIsEdit(false);
    setSubCategoryData(null);
  };

  const handleClose = () => {
    setOpenSubCategoryForm(false); 
    setIsEdit(false);
    setSubCategoryData(null);
    };

  if (productLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? "Edit Subcategory" : "Add New Subcategory"}
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="subCatName"
              className="block mb-2 text-gray-700 font-medium"
            >
              Subcategory Name
            </label>
            <input
              type="text"
              id="subCatName"
              name="subCatName"
              placeholder="Enter subcategory name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={subCatName}
              onChange={(e) => setSubCatName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="subCatDesc"
              className="block mb-2 text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="subCatDesc"
              name="subCatDesc"
              rows="4"
              placeholder="Enter description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={subCatDesc}
              onChange={(e) => setSubCatDesc(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="subCatImage"
              className="block mb-2 text-gray-700 font-medium"
            >
              Image
            </label>
            <input
              type="file"
              id="subCatImage"
              name="subCatImage"
              accept="image/*"
              className="w-full"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-24 h-24 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isEdit ? "Update Subcategory" : "Add Subcategory"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
